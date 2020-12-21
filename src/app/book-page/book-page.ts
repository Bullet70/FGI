export class BookPage {
  url: string;
  loaded: boolean;
  image: HTMLImageElement;

  constructor() {
    this.image = new Image();
    this.loaded = false;
  }
}