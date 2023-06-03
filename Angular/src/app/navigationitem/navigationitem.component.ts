import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigationitem',
  templateUrl: './navigationitem.component.html',
  styleUrls: ['./navigationitem.component.sass']
})
export class NavigationitemComponent {
  @Input() link!: string;
  @Input() label!: string;
  class: string = '';

  setToActive() {
    this.class = 'active';
  }
}
