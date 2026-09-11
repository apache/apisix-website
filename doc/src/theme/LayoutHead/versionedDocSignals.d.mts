export const versionedDocPath: RegExp;

export interface VersionedDocSignals {
  canonicalUrl: string;
  robots: 'noindex,follow';
}

export function getVersionedDocSignals(
  pathname: string,
  siteUrl: string,
  latestPath: string | null,
): VersionedDocSignals | null;
