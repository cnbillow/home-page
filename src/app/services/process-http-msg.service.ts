import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Response } from '@shared/models/response';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpMsgService {

  constructor () { }

  /**
   * 简介：处理错误的处理函数
   * 
   * @param  {HttpErrorResponse | any} error 异常错误
   * @return {Observable<never>}
   */
  public handleError (error: HttpErrorResponse | any): Observable<never> {

    let errMsg: String;

    if (typeof error === 'string') {
      errMsg = error;
    } else if (error.error instanceof Error) {
      errMsg = error.error.message;
    } else {
      errMsg = error.message;
    }

    return throwError(errMsg);
  }

  /**
   * 简介：获取响应后的处理函数
   * 与后端约定：如果 code 字段不为 '0'，皆为异常
   * 
   * @param  {Response} response 服务端响应
   * @return {Object} 响应数据
   */
  public handleMapResponse (response: Response): Object {
    if (response.code === '0') return response.data;
    else throw new Error(response.message);
  }
}
