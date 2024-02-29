export interface News {
    id?: string;
    postDate?: number;
    title: string;
    description: string;
    photo: File;
    tags?: string[];
  }

export interface TagCount {
    tag: string;
    count: number;
  }