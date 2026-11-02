const isObject = (value: unknown): value is { [key: string]: unknown } => (
  value !== null && typeof value === 'object' && !Array.isArray(value)
);

/** Accept release patch versions; Next is deliberately not tied to a release. */
// eslint-disable-next-line import/prefer-default-export
export function isAdminApiSpec(spec: unknown, version?: string): boolean {
  if (!isObject(spec) || !isObject(spec.info)) return false;
  return typeof spec.openapi === 'string' && spec.openapi.startsWith('3.')
    && typeof spec.info.title === 'string'
    && typeof spec.info.version === 'string'
    && (!version || version === 'next' || spec.info.version === version || spec.info.version.startsWith(`${version}.`))
    && isObject(spec.paths);
}

/** Keep the canonical Next contract intact while labeling its rendered preview. */
export function adminApiDisplaySpec(spec: unknown, version?: string): unknown {
  if (version !== 'next' || !isObject(spec) || !isObject(spec.info)) return spec;
  return { ...spec, info: { ...spec.info, version: 'Next' } };
}
