import { Component, OnInit, OnDestroy } from '@angular/core';

import { HomeService } from '@services/home.service';
import { NzMessageService } from 'ng-zorro-antd';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  homeData: Object = new Object(); // 首页数据
  infoSubscription: Subscription;  // 订阅器

  constructor (private homeService: HomeService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.infoSubscription = this.homeService.getHomeData() // 获取首页信息
      .subscribe( 
        (homeData: Object) => {
          this.homeData = homeData;
        }, 
        (error: string) => {
          this.messageService.error(error);
        }
      );
  }

  ngOnDestroy () {
    if (this.infoSubscription) this.infoSubscription.unsubscribe(); // 取消订阅
  }
}
