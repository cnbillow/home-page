import { Component, OnInit, OnDestroy } from '@angular/core';

import { Experience } from '@shared/models/experience';
import { HomeService } from '@services/home.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.less']
})
export class ExperienceDetailComponent implements OnInit, OnDestroy {

  isVisible: boolean; // 弹窗是否显示
  experience: Experience; // 工作经历

  modalSubscription: Subscription;

  constructor (private homeService: HomeService) { }

  ngOnInit () {
    this.modalSubscription = this.homeService.showExpDetailEvent.subscribe((exp: Experience) => {
      this.isVisible = true;
      this.experience = exp;
    });
  }

  ngOnDestroy () {
    if (this.modalSubscription) this.modalSubscription.unsubscribe();
  }

  /**
   * 简介：点击关闭弹窗的处理函数
   * @return void
   */
  closeModal (): void {
    this.isVisible = false;
  }
}
