import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AdminAuthService } from '@services/admin-auth.service';
import { ProcessHttpMsgService } from '@services/process-http-msg.service';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// 发送请求时带上管理员 token 的拦截器
@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor (private inj: Injector) {}

  /**
   * 简介：拦截器实现的拦截函数
   * 
   * @param req: 当前准备发送的请求
   * @param next: 下一个处理器
   */
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const authService = this.inj.get(AdminAuthService);
    // Get the auth header from the service.
    const authToken = authService.getToken();
    // Clone the request to add the new header.
    const authReq = (authToken) ? req.clone({ headers: req.headers.append('Authorization', `bearer ${authToken}`) }) : req;
    
    return next.handle(authReq);
  }
}

// 服务端检查完 token 后回来的拦截器（针对于没有经过管理员认证）
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor (private inj: Injector) {}

  /**
   * 简介：拦截器实现的拦截函数
   * 
   * @param req: 当前准备发送的请求
   * @param next: 下一个处理器
   */
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authService = this.inj.get(AdminAuthService);
    const processHttpMsgService = this.inj.get(ProcessHttpMsgService);
    // Get the auth header from the service.
    const authToken = authService.getToken();

    return next.handle(req).pipe(
      map(processHttpMsgService.handleMapResponse),
      catchError((error: HttpErrorResponse | any) => {
        if (authToken) { // 如果有 token，就检查一下，基本都是销毁的
          authService.checkJwtToken();
        }
        let errMsg: String;
        if (typeof error === 'string') {
          errMsg = error;
        } else if (error.error instanceof Error) {
          errMsg = error.error.message;
        } else {
          errMsg = error.message;
        }
        return throwError(errMsg);
      })
    );
  }
}