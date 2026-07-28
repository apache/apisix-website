export interface DownloadProject {
  name: string;
  description: string;
  color: string;
  githubRepo: string;
  githubBranch: string;
  downloadPath: string;
  dockerhubPath?: string;
  version: string;
  releaseDate: string;
}

export interface PluginEntry {
  name: string;
  description?: string;
  logo?: string;
  useDefaultIcon?: boolean;
  beta?: boolean;
}

export interface PluginGroup {
  groupName: string;
  plugins: PluginEntry[];
}

interface RepoInfo {
  info?: {
    star?: number;
    issue?: number;
  };
}

interface SiteData {
  downloads: DownloadProject[];
  plugins: PluginGroup[];
  repoInfo: { [key: string]: RepoInfo };
}

const modules = import.meta.glob('/content/site-data.json', { eager: true }) as { [key: string]: { default: SiteData } };

const data = Object.values(modules)[0]?.default ?? {
  downloads: [],
  plugins: [],
  repoInfo: {},
};

export const getDownloads = (): DownloadProject[] => data.downloads;
export const getPluginGroups = (): PluginGroup[] => data.plugins;
export const getRepoInfo = (repo: string): RepoInfo | undefined => data.repoInfo[repo];
