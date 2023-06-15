import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MusicService } from '../Service/music.service';
import { Song } from '../BusinessObject/song';
import { Router } from '@angular/router';

const buildSongForm = (song: Song = new Song({})) => new FormGroup({
  Name: new FormControl(song.name),
  Length: new FormControl(song.length),
  Tags: new FormArray(
    song.tags.map(t => new FormControl(t.name))
  ),
});
type SongForm = ReturnType<typeof buildSongForm>;

@Component({
  selector: 'create-song-form',
  templateUrl: './create-song-form.component.html',
  styleUrls: ['./create-song-form.component.sass']
})
export class CreateSongFormComponent {
  @Input() song = new Song();

  formGroup: SongForm;
  canRemoveTags = false;
  isFetching = false;

  constructor(private musicService: MusicService, private router: Router) {
    this.formGroup = buildSongForm();
  }

  ngOnInit() {
    this.formGroup = buildSongForm(this.song);
  }

  createNewTag() {
    this.formGroup.controls.Tags.push(new FormControl(''));
    this.canRemoveTags = true;
  }

  deleteTag(index: number) {
    const tags = this.formGroup.controls.Tags;
    tags.removeAt(index);
    this.canRemoveTags = tags.length !== 1;
  }

  onSubmit() {
    this.isFetching = true;
    const observable = this.song.isAdding()
      ? this.musicService.addSong(this.formGroup.value as any)
      : this.musicService.editSong(this.formGroup.value as any);

    observable.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.isFetching = false,
    });
  }
}
