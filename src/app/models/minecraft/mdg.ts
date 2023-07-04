export interface MGDIndex {
  latest: string;
  latest_release: string;
  versions: Record<string, MGDIndexVersion>;
}

export interface MGDIndexVersion {
  id: string;
  version: string;
  type: string;
  path: string;
  comparisons: {
    id: string;
    path: string;
  }[];
}

export interface Command {
  type: string;
  children: Record<string, Command>;
}

export interface MGDLanguages {
  [key: string]: MGDLanguage;
}

export interface MGDLanguage {
  hash: string;
  size: number;
  url: string;
}
