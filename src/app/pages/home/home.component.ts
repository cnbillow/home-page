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

  homeData: Object = new Object();
  infoSubscription: Subscription;

  constructor (private homeService: HomeService,
    private messageService: NzMessageService) { }

  ngOnInit () {
    this.infoSubscription = this.homeService.getHomeData().subscribe( // 获取首页信息
      (homeData: Object) => {
        this.homeData = homeData;
      }, 
      (error: string) => {
        this.messageService.error(error);
      });
  }

  ngOnDestroy () {
    if (this.infoSubscription) this.infoSubscription.unsubscribe();
  }
}
