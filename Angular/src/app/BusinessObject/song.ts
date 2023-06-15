import { RawTag, Tag } from "./tag";

export type RawSong = {
  songId: number,
  name: string,
  length: number,
  tags: RawTag[],
}

export class Song {
  songId: number;
  name: string;
  length: number;

  tags: Tag[];

  constructor(rawData: Partial<RawSong> = {}) {
    const {
      songId = -1,
      name = '',
      length = 0,
      tags = [{ name: '' }],
    } = rawData;

    this.songId = songId;
    this.name = name;
    this.length = length;
    this.tags = tags.map(t => new Tag(t));
  }

  isAdding() {
    return this.songId === -1;
  }

  isEditing() {
    return this.songId !== -1;
  }
}
