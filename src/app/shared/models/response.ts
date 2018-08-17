/**
 * Http 响应体
 */
export class Response {
  code: string;    // 返回码，与后端约定为 '0' 是正常返回，其余皆为异常
  message: string; // 返回码附带的错误类或其他信息
  data: Object;    // 响应中的数据部分
}