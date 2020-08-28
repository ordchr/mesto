export class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this.userName = document.querySelector(userNameSelector);
    this.userInfo = document.querySelector(userInfoSelector);

  }

  getUserInfo() {
    return {
      userName: this.userName.textContent,
      userInfo: this.userInfo.textContent
    };
  }

  setUserInfo({name, about}) {
    this.userName.textContent = name;
    this.userInfo.textContent = about;
  }

}
