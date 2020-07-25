export class Card {
  constructor(title, link, cardSelector) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;

  }

  _getTemplate() {
    const cardTempate = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardTempate;
  }

  _makeCard = (placeName, placeLink) => {
    const card = this._getTemplate();
    const cardImage = card.querySelector('.place__image');
    card.querySelector('.place__title-text').textContent=this._title;
    cardImage.src=this._link;
    cardImage.alt=this._title;

    return card;
  }

  getCard() {
    return this._makeCard();
  }
}
