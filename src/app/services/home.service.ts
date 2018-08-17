import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Experience } from '@shared/models/experience';

import { ProcessHttpMsgService } from '@services/process-http-msg.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl: string = `${environment.baseUrl}/api/home`; // 后端接口地址

  showExpDetailEvent: EventEmitter<Experience>; // 打开工作经历详情弹窗的事件

  constructor (private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) {

    this.showExpDetailEvent = new EventEmitter();
  }

  /**
   * 简介：获取首页的数据，如：工作经历、教育背景等
   * 
   * @return Observable<Object>
   */
  getHomeData (): Observable<Object> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        catchError(this.processHttpMsgService.handleError)
      );
  }
}
