import styleGlobal from '../../global.module.scss';
import style from './header.module.scss';
import imgLogo from 'images/logo.svg';
import imgSearch from 'images/Search.svg';
import imgBar from 'images/bar.svg';
import imgUser from 'images/user.svg';
import imgBasket from 'images/basket.svg';

export const header = () => {
  const headerHtmlEl = document.getElementById('header');

  headerHtmlEl ? 
  headerHtmlEl.innerHTML = `
    <div class="${style.header}">
      <div class="${styleGlobal.container}">
        <div class="${style.header__top}">
          <div>
            <img class="logo" src="${imgLogo}" alt="logo">
            <img class="${style.header__top__search}" src="${imgSearch}" alt="Search">
          </div>
          <div>
            <img class="bar" src="${imgBar}" alt="bar">
            <img class="${style.header__top__user}" src="${imgUser}" alt="user">
            <span class="${style.header__top__basketWrap}">
              <img class="basket" src="${imgBasket}" alt="basket">
              <span>5</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ` :
  ''
}