import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { environment } from '@environments/environment';

import { Response } from '@shared/models/response';
import { ProcessHttpMsgService } from '@services/process-http-msg.service';

import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * 管理员的认证信息
 */
interface AdminCredential {
  adminName: string; // 管理员名称
  token: string;     // 管理员 token
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  apiUrl: string = `${environment.apiUrl}/admin`;     // 后端接口地址
  tokenKey: string = 'adminJWT';                      // 存放管理员 token 的键值
  isAuthenticated: boolean = false;                   // 是否已经登录
  adminName: Subject<string> = new Subject<string>(); // 管理员名字
  adminToken: string = undefined;                     // 管理员 token

  loginEvent: EventEmitter<any> = new EventEmitter(); // 打开登录弹窗的事件

  constructor (private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService,
    private router: Router) {

    this.loginEvent = new EventEmitter();
  }
  
  /**
   * 简介：实现路由守卫的函数
   * 
   * @return boolean, 如果管理员通过认证则返回 true，否则 false
   */
  canActivate (): boolean {
    if (this.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  /**
   * 简介：检查管理员的 token 是否合法
   * 
   * @return void
   */
  checkJwtToken (): void {
    this.http.get<Response>(`${this.apiUrl}/check-jwt`)
    .pipe(
      map(this.processHttpMsgService.handleMapResponse),
      map((data: Object) => { return data['user']['adminName'] })
    )
    .subscribe(
      (adminName: string) => { this.sendAdminName(adminName); },
      (err: string) => { this.destroyCredential(); },
    );
  }

  /**
   * 简介：发布管理员名称的订阅事件
   * 
   * @return Observable<string>
   */
  getAdminName (): Observable<string> {
    return this.adminName.asObservable();
  }

  /**
   * 简介：发布订阅事件，更新管理员名称
   * 
   * @param name: 管理员名称
   * @return void
   */
  sendAdminName (name: string): void {
    this.adminName.next(name);
  }

  /**
   * 简介：发布订阅事件，清空管理员名称
   * 
   * @return void
   */
  clearAdminName (): void {
    this.adminName.next(undefined);
  }

  /**
   * 简介：读取管理员的认证信息
   * 
   * @return void
   */
  loadCredential (): void {
    const credentials = <AdminCredential>JSON.parse(localStorage.getItem(this.tokenKey));
    if (credentials && credentials.adminName != undefined) {
      this.useCredential(credentials);
      if (this.adminToken) {
        this.checkJwtToken();
      }
    }
  }

  /**
   * 简介：存储管理员的认证信息
   * 
   * @return void
   */
  storeCredential (credentials: AdminCredential): void { 
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredential(credentials);
  }

  /**
   * 简介：使用管理员的认证信息
   * 
   * @return void
   */
  useCredential (credentials: AdminCredential): void {
    this.isAuthenticated = true;
    this.sendAdminName(credentials.adminName);
    this.adminToken = credentials.token;
  }

  /**
   * 简介：清空管理员的认证信息
   * 
   * @return void
   */
  destroyCredential (): void {
    this.adminToken = undefined;
    this.clearAdminName();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * 简介：管理员登录
   * 
   * @param adminName: 管理员名称
   * @param password: 管理员密码
   * @return Observable<string>, 管理员名称
   */
  login (adminName: string, password: string): Observable<string> {
    return this.http.post<Response>(`${this.apiUrl}/login`, { adminName, password })
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        map((data: Object) => {
          const token = data['token'];
          this.storeCredential(<AdminCredential>{ adminName, token });
          return adminName;
        }),
        catchError(this.processHttpMsgService.handleError)
      );
  }

  /**
   * 简介：管理员登出
   * 
   * @return void
   */
  logout (): void {
    this.destroyCredential();
  }

  /**
   * 简介：获取管理员 token
   * 
   * @return string
   */
  getToken (): string {
    return this.adminToken;
  }
}
