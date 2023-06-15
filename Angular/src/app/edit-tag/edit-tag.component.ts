import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../BusinessObject/tag';
import { MusicService } from '../Service/music.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.sass']
})
export class EditTagComponent {
  formGroup = new FormGroup({
    tagId: new FormControl(-1),
    name: new FormControl(''),
    description: new FormControl(''),
  });
  isFetching = false;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService, 
    private router: Router
  ) { }

  buildForm(t: Tag) {
    this.formGroup = new FormGroup({
      tagId: new FormControl(t.tagId),
      name: new FormControl(t.name),
      description: new FormControl(t.description),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +(params.get('id') ?? -1);

      this.musicService.getTag(id).subscribe(t => this.buildForm(t));
    });
  }

  onSubmit() {
    this.isFetching = true;
    this.musicService.editTag(this.formGroup.value as any).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.isFetching = false,
    });
  }
}
