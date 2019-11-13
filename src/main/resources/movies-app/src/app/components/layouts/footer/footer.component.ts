import { Component, OnInit } from '@angular/core';
import { ITEMS } from './links';

@Component({
  selector: 'mv-footer',
  templateUrl: './footer.component.html',
  styles: [
    '#sticky-footer { flex-shrink: none; position: absolute; bottom: 0; width: 100%; }',
    '.footer-copy { background-color: #232629; }',
  ]
})
export class FooterComponent implements OnInit {

  private fullName: string = 'Radouane EL FADEL';
  private companyName: string = 'MALTEM';

  private links: Array<any> = ITEMS;

  constructor() { }

  ngOnInit() {}

}
