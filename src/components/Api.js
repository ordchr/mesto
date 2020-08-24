export class Api {
  constructor({baseUrl, headersAuthorization}) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._call = this._call.bind(this);
  }

  // другие методы работы с API

  _call(method, action, body) {
    const requestData = {
      method: method,
      headers: {
        authorization: this._headersAuthorization,
        'Content-Type': 'application/json'
      },
    };
    if (body) {
      requestData.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}/${action}`, requestData).then(
        res => {
          console.log(res.ok);
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      );
      // .then(
      // data => {
        // console.log(data);
        // action(data);
      // });
  }

  getUserInfo() {
    return this._call('GET', 'users/me');
  }

  updateUserInfo(body) {
    return this._call('PATCH', 'users/me', body);
  }

  getInitialCards() {
    return this._call('GET', 'cards');
  }

  addCard(body) {
    return this._call('POST', 'cards', body);
  }

  deleteCard(cardId) {
    return this._call('DELETE', `cards/${cardId}`);
  }

  likeCard(cardId) {
    return this._call('PUT', `cards/likes/${cardId}`);
  }

  dislikeCard(cardId) {
    return this._call('DELETE', `cards/likes/${cardId}`);
  }

}
