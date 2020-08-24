export class Section {
  constructor({renderer}, containerSelector) {
    this._containerForAppend = document.querySelector(containerSelector);
    this._renderer = renderer.bind(this);
  }

  renderAll(items) {
    items.forEach((item) => {
      const element = this._renderer( item.name, item.link, item.likes.length, item.owner._id, item._id );
      this.addItem(element);
    });

  }

  addItem(element) {
    this._containerForAppend.prepend(element);
  }
}
