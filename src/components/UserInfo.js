export class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);

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
