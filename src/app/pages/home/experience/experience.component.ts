import { Component, OnInit, Input } from '@angular/core';

import { Experience } from '@shared/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.less']
})
export class ExperienceComponent implements OnInit {

  @Input() experiences: Experience[]; // 首页组件传入的工作经历数组

  constructor () { }

  ngOnInit () {
  }

}
