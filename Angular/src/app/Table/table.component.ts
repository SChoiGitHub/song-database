import { Component } from '@angular/core';
import { MusicService } from '../Service/music.service';
import { Song } from '../BusinessObject/song';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  songs: Song[];

  constructor(private musicService: MusicService) {
    this.songs = [];
    this.musicService.songs.subscribe(s => this.songs = s);
  }

  deleteSong(songId: number) {
    this.musicService.deleteSong(songId);
  }
}
