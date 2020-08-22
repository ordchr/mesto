export class Api {
  constructor({baseUrl, headersAuthorization}) {
    this._baseUrl = baseUrl;
    this._headersAuthorization = headersAuthorization;
    this._call = this._call.bind(this);
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API

  _call(action, method) {
    return fetch(`${this._baseUrl}/${method}`, 
      {
        headers: {
          authorization: this._headersAuthorization
        }
      })
      .then(
        res => {
          console.log(res.ok);
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      ).then(
      data => {
        console.log(data);
        action(data);
      });
  }

  getUserInfo(renderFunction) {
    return this._call(renderFunction, 'users/me');
  }

}
