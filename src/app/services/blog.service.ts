import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

import { Response } from '@shared/models/response';
import { Blog } from '@shared/models/blog';
import { Comment } from '@shared/models/comment';

import { ProcessHttpMsgService } from '@services/process-http-msg.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl: string = `${environment.apiUrl}/blogs`; // 后端接口地址

  refreshEvent: EventEmitter<Blog>; // 刷新博客事件

  constructor (private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) {

    this.refreshEvent = new EventEmitter();
  }

  /**
   * 简介：获取博客列表信息
   * 
   * @return {Observable<Blog[]>}
   */
  getBlogs (): Observable<Blog[]> {
    return this.http.get<Response>(this.apiUrl)
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        map((data: Object) => { return <Blog[]>data['blogs'] }),
        catchError(this.processHttpMsgService.handleError)
      );
  }

  /**
   * 简介：根据博客 ID 获取博客详情
   * 
   * @param  {string} blogId 博客 ID
   * @return {Observable<Blog>}
   */
  getBlogById (blogId: string): Observable<Blog> {
    return this.http.get<Response>(`${this.apiUrl}/${blogId}`)
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        map((data: Object) => { return <Blog>data['blog'] }),
        catchError(this.processHttpMsgService.handleError)
      );
  }

  /**
   * 简介：添加博客
   * 
   * @param  {Blog} blog 博客数据
   * @return {Observable<any>}
   */
  addBlog (blog: Blog): Observable<any> {
    return this.http.post<Response>(this.apiUrl, blog)
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        catchError(this.processHttpMsgService.handleError)
      );
  }

  /**
   * 简介：给博客添加评论
   * 
   * @param  {Comment} comment 评论数据
   * @param  {string} blogId 博客 ID
   * @return {Observable<any>}
   */
  addComment (comment: Comment, blogId: string): Observable<Blog> {
    return this.http.post<Response>(`${this.apiUrl}/${blogId}/comments`, comment)
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        map((data: Object) => { return <Blog>data['blog']; }),
        catchError(this.processHttpMsgService.handleError)
      );
  }
}
