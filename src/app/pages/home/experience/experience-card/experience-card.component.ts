import { Component, OnInit, Input } from '@angular/core';

import { Experience } from '@shared/models/experience';

import { HomeService } from '@services/home.service';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.less']
})
export class ExperienceCardComponent implements OnInit {

  @Input() experience: Experience; // 从父组件传入的工作经历对象

  constructor (private homeService: HomeService) { }

  ngOnInit () {
  }

  /**
   * 简介：展示工作经历详情，这里只是触发打开弹窗
   * 
   * @return {void}
   */
  showExperienceDetail (): void {
    this.homeService.showExpDetailEvent.emit(this.experience);
  }
}
