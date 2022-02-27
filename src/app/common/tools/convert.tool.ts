import {CheckersTool} from './checkers.tool';

export class ConvertTool {

  /**
   *
   * @param value
   */
  public static pushZIfIsNotExist(value: string) {
    if (value.charAt(value.length - 1) !== 'Z') {
      return value + 'Z';
    }
    return value;
  }

  public static clearObject<T>(object: T): T {

    Object.keys(object).forEach((key) => {
      if (CheckersTool.isNullOrUndefinedOrEmpty(object[key])) {
        delete object[key];
      }
    });

    return object as T;

  }

}
