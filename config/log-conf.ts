import { consoleTransport, logger } from "react-native-logs";
import { axiomTransport } from "./axiom-transport";

const log = logger.createLogger({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  // note transport is set to console only in development to avoid sending logs during testing or in production without explicit opt-in.
  transport: __DEV__ ? consoleTransport : [consoleTransport, axiomTransport],
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: false,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
  enabledExtensions: null
});

export default log;