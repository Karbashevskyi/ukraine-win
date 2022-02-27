export class CheckersTool {

  /**
   *
   * @param value
   */
  public static isNull(value: any): boolean {
    return [null, 'null'].includes(value);
  }

  /**
   *
   * @param value
   */
  public static isUndefined(value: any): boolean {
    return [undefined, 'undefined'].includes(value);
  }

  /**
   *
   * @param value
   */
  public static isNullOrUndefined(value: any): boolean {
    return this.isNull(value) || this.isUndefined(value);
  }

  /**
   *
   * @param value
   */
  public static isNotNullOrUndefined(value: any): boolean {
    return !this.isNullOrUndefined(value);
  }

  /**
   *
   * @param value
   */
  public static isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   *
   * @param value
   */
  public static isMotNumber(value: any): boolean {
    return !this.isNumber(value);
  }

  /**
   *
   * @param value
   */
  public static universalEmptyChecker(value: any): boolean {

    if (this.isNullOrUndefined(value)) {
      return true;
    }

    if (this.isNumber(value)) {
      value = true;
    } else {
      value = Object.keys(value)?.length;
    }

    return value === 0;

    // TODO Add JSON.parse?

  }

  /**
   *
   * @param value
   */
  public static isEmptyObject(value: object): boolean {
    return this.universalEmptyChecker(value);
  }

  /**
   *
   * @param value
   */
  public static isNotEmptyObject(value: object): boolean {
    return !this.isEmptyObject(value);
  }

  /**
   *
   * @param value
   */
  public static isEmptyString(value: string): boolean {
    return this.universalEmptyChecker(value);
  }

  /**
   *
   * @param value
   */
  public static isNotEmptyString(value: string): boolean {
    return !this.isEmptyString(value);
  }

  /**
   *
   * @param value
   */
  public static isNullOrUndefinedOrEmpty(value: any): boolean {
    return this.universalEmptyChecker(value);
  }

  /**
   *
   * @param value
   */
  public static isNotNullOrUndefinedOrEmpty(value: any): boolean {
    return !this.isNullOrUndefinedOrEmpty(value);
  }

  /**
   *
   * @param enabled
   */
  public static isNotFalse(enabled: boolean): boolean {
    return enabled !== false;
  }

}
