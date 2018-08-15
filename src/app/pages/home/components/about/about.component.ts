import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  @Input() aboutData: Object; // 从首页组件传入的数据

  constructor () { }

  ngOnInit () {
  }

}
