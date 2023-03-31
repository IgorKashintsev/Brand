import styleGlobal from '../../global.module.scss';
import style from './header.module.scss';
import imgLogo from 'images/logo.svg';
import imgSearch from 'images/Search.svg';
import imgBar from 'images/bar.svg';
import imgUser from 'images/user.svg';
import imgBasket from 'images/basket.svg';
import imgClose from 'images/close.svg';
import { cartList } from '../goods/goods';

export const header = () => {
  const headerHtmlEl = document.getElementById('header');

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    const barHtmlEl = document.getElementById('bar');
    const closeHtmlEl = document.getElementById('close');
    const logoHtmlEl = document.getElementById('logo');
    const menuHtmlEl = document.getElementById('menu');
    const cartHtmlEl = document.getElementById('basket');
    const userHtmlEl = document.getElementById('user');
    barHtmlEl?.addEventListener('click', () => 
      menuHtmlEl?.classList.toggle(`${style.menu__active}`)
    );
    closeHtmlEl?.addEventListener('click', () => 
      menuHtmlEl?.classList.toggle(`${style.menu__active}`)
    );
    logoHtmlEl?.addEventListener('click', () => location.hash = 'main');
    cartHtmlEl?.addEventListener('click', () => location.hash = 'cart');
    userHtmlEl?.addEventListener('click', () => location.hash = 'user');
    addEventListener('hashchange', () => 
      menuHtmlEl?.classList.add(`${style.menu__active}`)
    );
  }).catch((err: Error) => console.log(err));

  headerHtmlEl ? 
    headerHtmlEl.innerHTML = `
    <div class="${style.header}">
      <div class="${styleGlobal.container}">
        <div class="${style.header__top}">
          <div>
            <img id="logo" class="${style.header__top__logo}" src="${imgLogo}" alt="logo">
            <img class="${style.header__top__search}" src="${imgSearch}" alt="Search">
          </div>
          <div>
            <img id="bar" class="${style.header__top__bar}" src="${imgBar}" alt="bar">
            <img id="user" class="${style.header__top__user}" src="${imgUser}" alt="user">
            <span id="basket" class="${style.header__top__basketWrap}">
              <img class="basket" src="${imgBasket}" alt="basket">
              <span
                id="quantityCart"
              >${cartList.quantityCart}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="menu" class="${style.menu} ${style.menu__active}">
      <div><img id="close" src="${imgClose}" alt="close"></div>
      <div class="${style.menu__header}">MENU</div>
      <div class="${style.menu__man}">MAN
        <ul>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Bags</a></li>
          <li><a href="#">Denim</a></li>
          <li><a href="#">T-Shirts</a></li>
        </ul>
      </div>
      <div class="${style.menu__woman}">WOMAN
        <ul>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Jackets & Coats</a></li>
          <li><a href="#">Polos</a></li>
          <li><a href="#">T-Shirts</a></li>
          <li><a href="#">Shirts</a></li>
        </ul>
      </div>
      <div class="${style.menu__kids}">KIDS
        <ul>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Jackets & Coats</a></li>
          <li><a href="#">Polos</a></li>
          <li><a href="#">T-Shirts</a></li>
          <li><a href="#">Shirts</a></li>
          <li><a href="#">Bags</a></li>
        </ul>
      </div>
    </div>
  ` :
    '';
};