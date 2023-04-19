export interface FileAnalyze {
  analyzing: boolean;
  analyzed: boolean;
  file: File;
}

export interface AnalyzeStats {
  commandStats: Map<string, CommandStats>;
}

export interface CommandStats {
  commandName: string;
  files: CommandFileStats[];
}

export interface CommandFileStats {
  file: File;
  lines: CommandLineStats[];
}

export interface CommandLineStats {
  
}
