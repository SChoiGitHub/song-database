export type RawTag = {
  tagId: number,
}

export class Tag {
  tagId: number;

  constructor(rawData: Partial<RawTag>) {
    const {
      tagId = 0,
    } = rawData;

    this.tagId = tagId;
  }
}
