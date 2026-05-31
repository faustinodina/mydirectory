// Axiom transport for react-native-logs.
// Buffers log entries in memory and sends them in batches to the Axiom ingest API
// every 5 seconds, when the batch reaches 50 entries, or immediately on errors.
// Also flushes when the app goes to background to avoid losing buffered logs.
// Requires AXIOM_TOKEN and AXIOM_DATASET to be set in app.config.js extra fields.

import Constants from 'expo-constants';
import { AppState } from 'react-native';
import { transportFunctionType } from 'react-native-logs';

type LogEntry = {
  _time: string;
  level: string;
  message: string;
};

const FLUSH_INTERVAL_MS = 5000;
const MAX_BATCH_SIZE = 50;

const buffer: LogEntry[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

const flush = async () => {
  if (buffer.length === 0) return;

  const token = Constants.expoConfig?.extra?.axiomToken as string | undefined;
  const dataset = Constants.expoConfig?.extra?.axiomDataset as string | undefined;

  if (!token || !dataset) return;

  // Drain the buffer before the async call so new entries aren't lost
  // if flush is called again before this one completes.
  const entries = buffer.splice(0, buffer.length);

  try {
    await fetch(`https://api.axiom.co/v1/datasets/${dataset}/ingest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entries),
    });
  } catch {
    // Silently discard — logging must never crash the app.
  }
};

const scheduleFlush = () => {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flush();
  }, FLUSH_INTERVAL_MS);
};

// Flush immediately when the app goes to background so buffered logs
// are not lost if the process is killed by the OS.
AppState.addEventListener('change', (state) => {
  if (state === 'background') void flush();
});

export const axiomTransport: transportFunctionType = (props) => {
  buffer.push({
    _time: new Date().toISOString(),
    level: props.level.text,
    message: props.rawMsg,
  });

  // Flush immediately on errors or when the batch is full,
  // otherwise schedule a timed flush to batch normal log lines.
  if (props.level.text === 'error' || buffer.length >= MAX_BATCH_SIZE) {
    void flush();
  } else {
    scheduleFlush();
  }
};
