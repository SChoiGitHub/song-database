import { Component, Input } from '@angular/core';
import { Tag } from '../BusinessObject/tag';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.sass']
})
export class TagsListComponent {
  @Input() tags: Tag[] = [];

  constructor() { }
}
