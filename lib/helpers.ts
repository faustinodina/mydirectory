
export function parseNumberParam(value?: string): number | undefined {
  if (value === undefined) return undefined;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid numeric param: ${value}`);
  }

  return parsed;
}
