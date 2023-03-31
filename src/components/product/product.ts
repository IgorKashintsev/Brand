import { cartList, productsList } from '../goods/goods';
import styleGlobal from '../../global.module.scss';
import styleMain from '../main/main.module.scss';
import styleCatalog from '../catalog/catalog.module.scss';
import style from './product.module.scss';
import imgProduct from 'images/product.png';
import imgArrow from 'images/Arrow.svg';
import imgBasketPink from 'images/basketPink.svg';

export const product = () => {
  const productHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);

  const renderGoods = (feturedCardsHtmlEl: HTMLElement | null) => {
    for (let i = 0; i < 3; i++) {
      feturedCardsHtmlEl ?
        feturedCardsHtmlEl.insertAdjacentHTML('beforeend', productsList.getHTMLStringProduct(i)) :
        '';
    }
  };

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    const feturedCardsHtmlEl = document.getElementById('fetured__cards');
    renderGoods(feturedCardsHtmlEl);
    const blockProducts: HTMLDivElement | null = document.querySelector('#fetured__cards');
    cartList.handleClickBuyBtn(blockProducts!);
  }).catch((err: Error) => console.log(err));

  productHtmlEl ?
    productHtmlEl.innerHTML = `
    <div class="${styleCatalog.arrivals}">
      <div class="${styleGlobal.container}">
        <div class="${styleCatalog.arrivals__new}">
          <div class="${styleCatalog.arrivals__new__left}">NEW ARRIVALS</div>
          <div class="${styleCatalog.arrivals__new__right}">HOME / MEN / <span>NEW ARRIVALS</span></div>
        </div>
      </div>
    </div>
    <div class="${style.product}">
      <div class="${style.product__arrowLeft}"></div>
      <div class="${style.product__img}">
        <img src="${imgProduct}" alt="product">
      </div>
      <div class="${style.product__arrowRight}"></div>
    </div>
    <div class="${style.collection} ${styleGlobal.container}">
      <h2>WOMEN COLLECTION</h2>
      <div class="${style.collection__dividerPink}"></div>
      <div class="${style.collection__moschino}">MOSCHINO CHEAP AND CHIC</div>
      <div class="${style.collection__text}">
        Compellingly actualize fully researched processes before proactive outsourcing.
        Progressively syndicate collaborative architectures before cutting-edge services. 
        Completely visualize parallel core competencies rather than exceptional portals.
      </div>
      <div class="${style.collection__price}">$561</div>
      <div class="${style.collection__dividerGray}"></div>
      <div class="${style.collection__choose}">
        <div class="${style.collection__choose__color}">
          <span>CHOOSE COLOR</span>
          <img src="${imgArrow}" alt="Arrow">
        </div>
        <div class="${style.collection__choose__size}">
          <span>CHOOSE SIZE</span>
          <img src="${imgArrow}" alt="Arrow">
        </div>
        <div class="${style.collection__choose__quantity}">
          <span>QUANTITY</span>
          <img src="${imgArrow}" alt="Arrow">
        </div>
      </div>
      <button>
        <img src="${imgBasketPink}" alt="Add">
        Add to Cart
      </button>
    </div>
    <div id="fetured__cards" class="${styleMain.fetured__cards} ${styleGlobal.container}"></div>
    <div class="${style.margin}"></div>
  ` :
    '';
};