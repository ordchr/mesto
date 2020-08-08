export class Section {
  constructor({items, renderer}, containerSelector) {
    this._containerForAppend = document.querySelector(containerSelector);
    this._itemsToAdd = items;
    this._renderer = renderer.bind(this);
  }

  renderAll() {
    this._itemsToAdd.forEach((item) => {
      const element = this._renderer( item.name, item.link );
      this.addItem(element);
    });
    
  }

  addItem(element) {
    this._containerForAppend.prepend(element);
  }
}
