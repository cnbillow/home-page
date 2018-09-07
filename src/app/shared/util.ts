export class Util {

  /**
   * 简介：预处理 get 请求发送到后端的 URL 数组参数
   * 正常情况下，如果在 URL 传递数组参数，会是这样：a=1&a=2&a=3
   * 但是！后端是用 PHP 写的，这样的传递方式只能获取到最后一个元素
   * 所以，跟后端商量后，决定通过这样的做法处理：a[]=1&a[]=2，加上中括号，不愧是最好的语言
   * 
   * 例如：
   * 传入的搜索条件对象是 { aid: 123, marketerNames: [赵完松, 刘定坚] }
   * 返回结果是 ?aid=123&marketerNames[]=赵完松&marketerNames[]=刘定坚
   * 
   * @param  {string} query 搜索条件对象
   * @return {string} URL 参数字符串
   */
  public static parseParams (query: Object): string {

    let paramStr = '';
    for (let key in query) {
      if (query[key].constructor === Array) {
        for (let i = 0; i < query[key].length; i++) {
          if (paramStr.length > 0) {
            paramStr += '&';
          }
          paramStr += `${key}[]=${query[key][i]}`;
        }
      } else {
        if (paramStr.length > 0) {
          paramStr += '&';
        }
        paramStr += `${key}=${query[key]}`;
      }
    }

    return paramStr;
  }

  /**
   * 简介：把日期转换成字符串，格式为：yyyy-MM-dd
   * 
   * @param  {Date} date: 日期对象
   * @return {string} 日期字符串
   */
  public static parseDate (date: Date): string {

    if (date == undefined || date.constructor != Date) return '';

    let year = date.getFullYear();
    let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
  }

  /**
   * 简介：深拷贝
   * 当然了这是 TypeScript，还可以有其他类，要是精确的拷贝，你必须通过反射获取它的类型
   * 
   * @param  {any} src: 被拷贝的变量
   * @param  {string[]} ignoreFields: 不需要拷贝的字段名称，这只是针对对象的
   * @return {any} src 的拷贝
   */
  public static deepCopy (src: any, ...ignoreFields: string[]): any {
    if (src == undefined) {
      return undefined;
    }
    let dst;
    if (src.constructor === Array) { // 如果是数组
      dst = [];
      for (let i = 0; i < src.length; i++) {
        dst[i] = this.deepCopy(src[i]);
      }
    } else if (src.constructor === Object) { // 如果是对象
      dst = {};
      for (let key in src) {
        if (ignoreFields.indexOf(key) < 0) { // 如果当前字段不在忽略字段的数组里
          dst[key] = this.deepCopy(src[key]);
        }
      }
    } else { // 如果是基本类型
      dst = src;
    }
    return dst;
  }
}