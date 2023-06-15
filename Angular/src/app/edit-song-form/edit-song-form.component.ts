import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../BusinessObject/song';
import { MusicService } from '../Service/music.service';

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
    this.route.paramMap.subscribe(params => {
      const id = +(params.get('id') ?? -1);

      this.musicService.getSong(id).subscribe(s => this.song = s);
    })
  }
}
