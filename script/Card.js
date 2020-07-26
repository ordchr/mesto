export class Card {
  constructor(title, link, cardSelector, popupPreviewer) {
    this._title = title;
    this._link = link;
    this._cardSelector = cardSelector;
    this._popupPreviewer = popupPreviewer;

  }

  _getTemplate() {
    const cardTempate = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return cardTempate;
  }

  _makeCard()  {
    const card = this._getTemplate();
    const cardImage = card.querySelector('.place__image');
    card.querySelector('.place__title-text').textContent=this._title;
    cardImage.src=this._link;
    cardImage.alt=this._title;
    this._setEventListeners(card);

    return card;
  }

  _setEventListeners(card) {
      card.querySelector('.place__title-like').addEventListener('click', (evt) => {
          evt.target.classList.toggle('place__title-like_selected');
      });
      card.querySelector('.place__image-del').addEventListener('click', (evt) => {
          evt.target.parentElement.remove();
      });
      card.querySelector('.place__image').addEventListener('click', (evt) => {
          this._popupPreviewer(evt.target);
      });

  }

  getCard() {
    return this._makeCard();
  }
}
