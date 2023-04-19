import {AnalyzeStats, CommandStats} from "../models/datanalyzer";
import {FileService} from "../../shared/services/file.service";
import {AppModule} from "../../app.module";

export class MCFunctionAnalyzer {
  static async analyzeFile(file: File, stats: AnalyzeStats) {
    const fileService: FileService = AppModule.injector.get(FileService);
    
    const content = await fileService.readFile(file);
    const lines = content.split('\n');

    console.log(lines)
  }
}
