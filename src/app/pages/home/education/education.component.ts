import { Component, OnInit, Input } from '@angular/core';

import { Education } from '@shared/models/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.less']
})
export class EducationComponent implements OnInit {

  @Input() educations: Education[]; // 首页组件传入的教育背景数组

  constructor () { }

  ngOnInit () {
  }

}
