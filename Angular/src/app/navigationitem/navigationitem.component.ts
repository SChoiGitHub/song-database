import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: '[navigationitem]',
  templateUrl: './navigationitem.component.html',
  styleUrls: ['./navigationitem.component.sass']
})
export class NavigationitemComponent {
  @Input() link!: string;
  @Input() label!: string;
  class: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.setActive(e.url === this.link);
      }
    })
  }

  ngOnInit() {
    this.setActive(false);
  }

  setActive(isActive: boolean) {
    this.class = isActive ? 'active' : "";
  }
}
