export class MiscUtils {
  static sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
