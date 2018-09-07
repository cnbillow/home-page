import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';

import { Response } from '@shared/models/response';
import { HomeData } from '@shared/models/home-data';
import { Experience } from '@shared/models/experience';

import { ProcessHttpMsgService } from '@services/process-http-msg.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl: string = `${environment.apiUrl}/home`; // 后端接口地址

  showExpDetailEvent: EventEmitter<Experience>; // 打开工作经历详情弹窗的事件

  constructor (private http: HttpClient,
    private processHttpMsgService: ProcessHttpMsgService) {

    this.showExpDetailEvent = new EventEmitter();
  }

  /**
   * 简介：获取首页的数据，如：工作经历、教育背景等
   * 
   * @return {Observable<HomeData>}
   */
  getHomeData (): Observable<HomeData> {
    return this.http.get<Response>(this.apiUrl)
      .pipe(
        map(this.processHttpMsgService.handleMapResponse),
        map((data: Object) => { return <HomeData>data }),
        catchError(this.processHttpMsgService.handleError)
      );
  }
}
