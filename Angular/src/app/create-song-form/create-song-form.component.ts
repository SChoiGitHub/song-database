import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MusicService } from '../Service/music.service';

@Component({
  selector: 'create-song-form',
  templateUrl: './create-song-form.component.html',
  styleUrls: ['./create-song-form.component.sass']
})
export class CreateSongFormComponent {
  formGroup = new FormGroup({
    Name: new FormControl(''),
    Length: new FormControl(0),
    Tags: new FormArray([
      new FormControl(''),
   ]),
  });

  constructor(private musicService: MusicService) { }

  createNewTag()
  {
    this.formGroup.controls.Tags.push(new FormControl(''));
  }

  onSubmit() {
    this.musicService.addSong(this.formGroup.value as any);
  }
}
