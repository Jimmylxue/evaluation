export function parseJson<T>(json: string) {
  try {
    return JSON.parse(json) as T;
  } catch {
    return undefined;
  }
}
