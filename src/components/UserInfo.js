export class UserInfo {
  constructor({userNameSelector, userInfoSelector}, api) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    console.log(api);
    this._api = api;

  }

  loadUserInfo(loadUserInfo) {
    this._api.getUserInfo(loadUserInfo);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent
    };
  }

  setUserInfo(inputValues) {
    this._userName.textContent = inputValues.name;
    this._userInfo.textContent = inputValues.profession;
  }

}
