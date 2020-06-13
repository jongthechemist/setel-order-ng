import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {

  @Input() header: String;
  constructor() { }

  ngOnInit(): void {
  }

}
