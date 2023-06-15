export type RawTag = {
  tagId: number,
  name: string,
  description: string,
}

export class Tag {
  tagId: number;
  name: string;
  description: string;

  constructor(rawData: Partial<RawTag>) {
    const {
      tagId = 0,
      name = '',
      description = '',
    } = rawData;

    this.tagId = tagId;
    this.name = name;
    this.description = description;
  }
}
