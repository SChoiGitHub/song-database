import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MusicService } from '../Service/music.service';
import { Song } from '../BusinessObject/song';

@Component({
  selector: 'app-edit-song-form',
  templateUrl: './edit-song-form.component.html',
  styleUrls: ['./edit-song-form.component.sass']
})
export class EditSongFormComponent {
  song: Song;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {
    this.song = new Song();
  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      return of(parseInt(params.get('id') ?? '0'));
    })).subscribe(x => this.song = this.musicService.getSong(x)); //TODO: Prefer observable
  }
}
