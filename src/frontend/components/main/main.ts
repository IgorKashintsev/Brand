import styleGlobal from '../../global.module.scss';
import style from './main.module.scss';
import imgTop from 'images/top_full.png';
import imgGroup36 from 'images/Group_36.png';
import imgGroup37 from 'images/Group_37.png';
import imgGroup38 from 'images/Group_38.png';
import imgGroup39 from 'images/Group_39.png';
import imgForma1 from 'images/Forma_1.svg';
import imgForma2 from 'images/Forma_2.svg';
import imgForma3 from 'images/Forma_3.svg';
import { productsList } from '../goods/goods';
import { cartList } from '../cartUser/cartUser';

export const main = () => {
  const mainHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);

  const renderGoods = () => {
    const feturedCardsHtmlEl = document.getElementById('fetured__cards');
    for (let i = 0; i < 6; i++) {
      if(productsList.products[i]) {
        feturedCardsHtmlEl ?
          feturedCardsHtmlEl.insertAdjacentHTML('beforeend', productsList.getHTMLStringProduct(i)!) :
          '';
      }
    }
  };

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    const buttonHtmlEl = document.getElementById('catalog');
    renderGoods();
    const blockProducts: HTMLDivElement | null = document.querySelector('#fetured__cards');
    cartList.handleClickBuyBtn(blockProducts!);
    buttonHtmlEl?.addEventListener('click', () => location.hash = 'catalog');
  }).catch((err: Error) => console.log(err));

  mainHtmlEl ?
    mainHtmlEl.innerHTML = `
  <div class="${style.brand}">
    <div class="${style.brand__left}">
      <img class="${style.brand__left__photo}" src="${imgTop}" alt="photo">
    </div>
    <div class="${style.brand__right}">
      <div class="${style.brand__right__brandPromoWrap}">
        <div>THE BRAND</div>
        <div>OF LUXERIOUS <span>FASHION</span></div>
      </div>
    </div>
  </div>
  <div class="${style.offers} ${styleGlobal.container}">
    <div class="${style.offers__item}">
      <img src="${imgGroup36}" alt="Women">
      <div class="${style.offers__item__title}">
        <p class="${style.offers__item__title__top}">30% OFF</p>
        <p class="${style.offers__item__title__bottom}">FOR WOMEN</p>
      </div>
    </div>
    <div class="${style.offers__item}">
      <img src="${imgGroup37}" alt="Men">
      <div class="${style.offers__item__title}">
        <p class="${style.offers__item__title__top}">HOT DEAL</p>
        <p class="${style.offers__item__title__bottom}">FOR MEN</p>
      </div>
    </div>
    <div class="${style.offers__item}">
      <img src="${imgGroup38}" alt="Kids">
      <div class="${style.offers__item__title}">
        <p class="${style.offers__item__title__top}">NEW ARRIVALS</p>
        <p class="${style.offers__item__title__bottom}">FOR KIDS</p>
      </div>
    </div>
  </div>
  <div class="${style.offerAccesories} ${styleGlobal.container}">
    <img src="${imgGroup39}" alt="Accesories">
    <div class="${style.offers__item__title}">
      <p class="${style.offers__item__title__top}">LUXIROUS & TRENDY</p>
      <p class="${style.offers__item__title__bottom}">ACCESORIES</p>
    </div>
  </div>
  <div class="${style.fetured__items} ${styleGlobal.container}">
    <h2>Fetured Items</h2>
    <p>Shop for items based on what we featured in this week</p>
  </div>
  <div id="fetured__cards" class="${style.fetured__cards} ${styleGlobal.container}"></div>
  <div class="${style.browse} ${styleGlobal.container}">
    <button id="catalog" >Browse All Product</button>
  </div>
  <div class="${style.services}">
    <div class="${styleGlobal.container}">
      <div class="${style.services__wrap}">
        <div class="${style.services__wrap__unit}">
          <img src="${imgForma1}" alt="photo">
          <h3 class="${style.h3__forma_1}">Free Delivery</h3>
          <p>Worldwide delivery on all. 
            Authorit tively morph next-generation innov tion with extensive models.
          </p>
        </div>
        <div class="${style.services__wrap__unit}">
          <img src="${imgForma2}" alt="photo">
          <h3 class="${style.h3__forma_2}">Sales & discounts</h3>
          <p>Worldwide delivery on all. 
            Authorit tively morph next-generation innov tion with extensive
            models.
          </p>
        </div>
        <div class="${style.services__wrap__unit}">
          <img src="${imgForma3}" alt="photo">
          <h3 class="${style.h3__forma_3}">Quality assurance</h3>
          <p>Worldwide delivery on all. 
            Authorit tively morph next-generation innov tion with extensive models.
          </p>
        </div>
      </div>
    </div>
  </div>
  ` :
    '';
};