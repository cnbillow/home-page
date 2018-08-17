import { Component, OnInit, Input } from '@angular/core';

import { Education } from '@shared/models/education';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.less']
})
export class EducationCardComponent implements OnInit {

  @Input() education: Education; // 从父组件传入的教育背景对象

  constructor () { }

  ngOnInit () {
  }

}
