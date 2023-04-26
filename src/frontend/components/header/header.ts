import styleGlobal from '../../global.module.scss';
import style from './header.module.scss';
import imgLogo from 'images/logo.svg';
import imgSearch from 'images/Search.svg';
import imgBar from 'images/bar.svg';
import imgUser from 'images/user.svg';
import imgBasket from 'images/basket.svg';
import imgClose from 'images/close.svg';
import { user } from '../user/user';
import { cartList } from '../cartUser/cartUser';

export const header = () => {
  const headerHtmlEl = document.getElementById('header');

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    const bodyHtmlEl = Array.from(document.getElementsByTagName('body'))[0];
    const logoHtmlEl = document.getElementById('logo');
    const menuHtmlEl = document.getElementById('menu');
    const cartHtmlEl = document.getElementById('basket');
    const userMenuHtmlEl = document.getElementById('userMenu');
    const logoutHtmlEl = document.getElementById('logout');
    const searchHtmlEl = document.getElementById('search');

    bodyHtmlEl.addEventListener('click', (ev) => {
      const elem = ev.target as HTMLElement;
      const elemId = elem.dataset['id'];

      if(elem.id !== 'bar' && elem.id !== 'menu' && elemId !== 'menuChild') {
        menuHtmlEl?.classList.add(`${style.none}`);
      } else if(elem.id === 'bar') {
        menuHtmlEl?.classList.toggle(`${style.none}`);
      }

      if(cartList.checkAuth() && elem.id === 'user') {
        userMenuHtmlEl?.classList.toggle(`${style.none}`);
      } else if(!cartList.checkAuth() && elem.id === 'user') {
        location.hash = 'signin';
      } else if(
        elem.id !== 'user' && 
          elem.id !== 'userMenu' && 
          elem.id !== 'userFirstname' &&
          elem.id !== 'userHr'
      ) {
        userMenuHtmlEl?.classList.add(`${style.none}`);
      }
    });

    logoutHtmlEl?.addEventListener('click', () => {
      user.logout();
      userMenuHtmlEl?.classList.add(`${style.none}`);
    });
    logoHtmlEl?.addEventListener('click', () => location.hash = '');
    cartHtmlEl?.addEventListener('click', () => location.hash = 'cart');
    searchHtmlEl?.addEventListener('click', () => console.log(location.href));
    cartList._updateHeaderCart();
    user._updateHeaderUserFirstName();
  }).catch((err: Error) => console.log(err));

  headerHtmlEl ? 
    headerHtmlEl.innerHTML = `
    <div class="${style.header}">
      <div class="${styleGlobal.container}">
        <div class="${style.header__top}">
          <div>
            <img id="logo" class="${style.header__top__logo}" src="${imgLogo}" alt="logo">
            <img id="search" class="${style.header__top__search}" src="${imgSearch}" alt="Search">
          </div>
          <div>
            <img id="bar" class="${style.header__top__bar}" src="${imgBar}" alt="bar">
            <div id="auth" class="${style.header__top__userAuth}">
              <img id="user" class="${style.header__top__userImg} " src="${imgUser}" alt="user">
              <div id="userMenu" class="${style.header__top__userAuth__menu} ${style.none}">
                <p 
                  id="userFirstname"
                  class="${style.header__top__userAuth__menu__firstName}"
                ></p>
                <hr id="userHr" class="${style.header__top__userAuth__menu__hr}"></hr>
                <p 
                  id="logout" 
                  class="${style.header__top__userAuth__menu__logout}"
                >Logout</p>
              </div>
            </div>
            <span id="basket" class="${style.header__top__basketWrap}">
              <img class="basket" src="${imgBasket}" alt="basket">
              <span
                id="quantityCart"
                class="${style.header__top__basketWrap__span}"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="menu" class="${style.menu} ${style.none}">
      <div><img id="close" src="${imgClose}" alt="close"></div>
      <div data-id="menuChild" class="${style.menu__header}">MENU</div>
      <div data-id="menuChild" class="${style.menu__man}">MAN
        <ul data-id="menuChild">
          <li data-id="menuChild"><a href="#">Accessories</a></li>
          <li data-id="menuChild"><a href="#">Bags</a></li>
          <li data-id="menuChild"><a href="#">Denim</a></li>
          <li data-id="menuChild"><a href="#">T-Shirts</a></li>
        </ul>
      </div>
      <div data-id="menuChild" class="${style.menu__woman}">WOMAN
        <ul data-id="menuChild">
          <li data-id="menuChild"><a href="#">Accessories</a></li>
          <li data-id="menuChild"><a href="#">Jackets & Coats</a></li>
          <li data-id="menuChild"><a href="#">Polos</a></li>
          <li data-id="menuChild"><a href="#">T-Shirts</a></li>
          <li data-id="menuChild"><a href="#">Shirts</a></li>
        </ul>
      </div>
      <div data-id="menuChild" class="${style.menu__kids}">KIDS
        <ul data-id="menuChild">
          <li data-id="menuChild"><a href="#">Accessories</a></li>
          <li data-id="menuChild"><a href="#">Jackets & Coats</a></li>
          <li data-id="menuChild"><a href="#">Polos</a></li>
          <li data-id="menuChild"><a href="#">T-Shirts</a></li>
          <li data-id="menuChild"><a href="#">Shirts</a></li>
          <li data-id="menuChild"><a href="#">Bags</a></li>
        </ul>
      </div>
    </div>
  ` :
    '';
};