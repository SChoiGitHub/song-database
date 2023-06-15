import { Component, ViewChild } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: '.navigationBar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.sass']
})
export class NavigationBarComponent {
  @ViewChild('nav', { static: true }) nav!: NgbNav;

  ngOnInit() {
    this.nav.select(-1);
  }
}
