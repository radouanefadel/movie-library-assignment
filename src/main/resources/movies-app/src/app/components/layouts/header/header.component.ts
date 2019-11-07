import { Component, OnInit } from '@angular/core';
import { ITEMS } from './menu';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  private items: Array<any> = ITEMS;

  constructor() { }

  ngOnInit() {
  }

}
