import { CartProduct, UserLogPass, UserObj, UserObjJson } from "src/frontend/types";
import styleHeader from '../header/header.module.scss';
import styleSignin from '../signin/signin.module.scss';
import styleRegistration from '../registration/registration.module.scss';
import { CartList } from "../cartUser/cartUser";
import { cart } from "../cart/cart";

export class User extends CartList{

  constructor() {
    super();
    if(!JSON.parse(localStorage.getItem('user')!)) {
      this.dataLocalStorage();
    }
  }

  dataLocalStorage() {
    localStorage.setItem('user', JSON.stringify(
      {
        auth: false,
        firstName: 'anonymous',
        login: 'anonymous',
        cartContents: [],
      }
    ));
  }

  changeLocalStorageAnonym(
      newCartContents: CartProduct[], 
      element?: HTMLElement | null,
      productIdDel?: number,
    ) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(
      {
        auth: false,
        firstName: 'anonymous',
        login: 'anonymous',
        cartContents: newCartContents,
      }
    ));
    if(element) {
      element.innerHTML = '';
    }
    if(productIdDel) {
      document.getElementById(`cart_${productIdDel.toString()}`)?.remove();
    }
    this._updateHeaderCart();
  }

  changeLocalStorageAuth(user: UserObj) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserJson(data: UserLogPass) {
    fetch('/user', {
      method: 'SEARCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(result => {
        this.changeLocalStorageAuth(result);
        location.hash = '';
      })
      .then(() => {
        this._updateHeaderUserFirstName();
        this._updateHeaderCart();
      })
      .catch(() => this.onLoginError())
  }

  postUserJson(data: UserObjJson) {
    fetch('/user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then(result => {
          this.changeLocalStorageAuth(result);
          location.hash = '';
      })
      .then(() => {
        this._updateHeaderUserFirstName();
        this._updateHeaderCart();
      })
      .catch(() => this.onRegistError())
  }

  onLoginError() {
    document.querySelector('#login')?.classList
      .add(`${styleSignin.registration__login__input__error}`);
    document.querySelector('#password')?.classList
      .add(`${styleSignin.registration__login__input__error}`);
    document.querySelector('#errLog')?.classList
      .remove(`${styleSignin.registration__login__errorLog__none}`);
  }

  onRegistError() {
    document.querySelector('#loginReg')?.classList
      .add(`${styleRegistration.registration__login__input__error}`);
    document.querySelector('#errorReg')?.classList
      .remove(`${styleRegistration.registration__login__errorReg__none}`);
  }

  _updateHeaderUserFirstName() {
    if(this.checkAuth()) {
      document.querySelector('#userFirstname')!
        .textContent = `${JSON.parse(localStorage.getItem('user')!).firstName}`;
      document.querySelector('#auth')?.classList
        .add(`${styleHeader.header__top__userAuth__background}`);
    } else {
      document.querySelector('#userFirstname')!.textContent = '';
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.dataLocalStorage();
    document.querySelector('#auth')?.classList
      .remove(`${styleHeader.header__top__userAuth__background}`);
    this._updateHeaderUserFirstName()
    this._updateHeaderCart();
    if(location.hash === '#cart') {
      cart();
    }
  }
}

export const user = new User();