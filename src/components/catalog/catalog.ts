import { cartList, productsList } from '../goods/goods';
import styleGlobal from '../../global.module.scss';
import styleMain from '../main/main.module.scss';
import style from './catalog.module.scss';
import imgForma1 from 'images/Forma_1.svg';
import imgForma2 from 'images/Forma_2.svg';
import imgForma3 from 'images/Forma_3.svg';
import imgFilter from 'images/Filter.svg';
import imgFilterBig_pink from 'images/filterBig_pink.svg';
import imgFilter_pink from 'images/Filter_pink.svg';
import imgArrow from 'images/Arrow.svg';
import imgArrowLeft from 'images/ArrowLeft.svg';
import imgArrowRight from 'images/ArrowRight.svg';

export const catalog = () => {
  const catalogHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);
  let currentPage = 1;
  const pageSize = 9;
  const pageCount = Math.ceil(productsList.products!.length / pageSize);

  const renderGoods = () => {
    const feturedCardsHtmlEl = document.getElementById('fetured__cards');
    feturedCardsHtmlEl!.innerHTML = '';
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    for (let i = start; i < end; i++) {
      if(productsList.products![i] !== undefined) {
        feturedCardsHtmlEl ?
          feturedCardsHtmlEl.insertAdjacentHTML('beforeend', productsList.getHTMLStringProduct(i)) :
          '';
      }
    }
  };

  const renderPagination = (paginationHtmlEl: HTMLElement | null) => {
    for (let i = 1; i <= pageCount; i++) {
      paginationHtmlEl ?
        paginationHtmlEl.insertAdjacentHTML(
          'beforeend', `<a data-id="${i}" href="#">${i}</a>`
        ) :
        '';
    }
  };

  const changePage = (ev: MouseEvent, element: HTMLElement) => {
    ev.preventDefault();
    const elementId = element.dataset['id'];
    
    if(element.tagName === 'A') {
      if(Number(elementId) === currentPage) {
        return;
      }
      window.scrollTo(0,0);
      currentPage = Number(elementId);
      renderGoods();
    } else if(element.tagName === 'IMG') {
      switch(elementId) {
      case('arrowLeft'): {
        if(currentPage === 1) {
          return;
        } else {
          window.scrollTo(0,0);
          currentPage -= 1;
          renderGoods();
        }
      } break;
      case('arrowRight'): {
        if(currentPage === pageCount) {
          return;
        } else {
          window.scrollTo(0,0);
          currentPage += 1;
          renderGoods();
        }
      }
      }
    }
  };

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    renderGoods();
    const paginationBlock = document.getElementById('paginationBlock');
    const paginationHtmlEl = document.getElementById('pagination');
    const blockProducts: HTMLDivElement | null = document.querySelector('#fetured__cards');
    cartList.handleClickBuyBtn(blockProducts!);
    renderPagination(paginationHtmlEl);
    paginationBlock?.addEventListener('click', (ev) => changePage(ev, ev.target as HTMLElement));
  }).catch((err: Error) => console.log(err));

  catalogHtmlEl ?
    catalogHtmlEl.innerHTML = `
    <div class="${style.arrivals}">
      <div class="${styleGlobal.container}">
        <div class="${style.arrivals__new}">
          <div class="${style.arrivals__new__left}">NEW ARRIVALS</div>
          <div class="${style.arrivals__new__right}">HOME / MEN / <span>NEW ARRIVALS</span></div>
        </div>
      </div>
    </div>
    <nav class="${style.filters} ${styleGlobal.container}">
      <div class="${style.filters__left}">
        <span>FILTER</span>
        <img class="${style.filters__left__img}" src="${imgFilter}" alt="filter">
        <div class="${style.filters__left__menu}">
          <img class="${style.filters__left__imgBig__pink}" src="${imgFilterBig_pink}" alt="filterBig">
          <img class="${style.filters__left__img__pink}" src="${imgFilter_pink}" alt="Filter_pink">
          <nav>
            <div class="${style.filters__left__menu__category}">CATEGORY</div>
            <div class="${style.filters__left__menu__list}">
              <ul>
                <li><a href="#">Accessories</a></li>
                <li><a href="#">Bags</a></li>
                <li><a href="#">Denim</a></li>
                <li><a href="#">Hoodies & Sweatshirts</a></li>
                <li><a href="#">Jackets & Coats</a></li>
                <li><a href="#">Polos</a></li>
                <li><a href="#">Shirts</a></li>
                <li><a href="#">Shoes</a></li>
                <li><a href="#">Sweaters & Knits</a></li>
                <li><a href="#">T-Shirts</a></li>
                <li><a href="#">Tanks</a></li>
              </ul>
            </div>
            <div class="${style.filters__left__menu__brand}">BRAND</div>
            <div class="${style.filters__left__menu__disigner}">DESIGNER</div>
          </nav>
        </div>
      </div>
      <div class="${style.filters__right}">
        <div class="filterTrending">
          <span>TRENDING NOW</span>
          <img src="${imgArrow}" alt="Arrow">
        </div>
        <div class="${style.filters__right__size}">
          <span>SIZE</span>
          <img src="${imgArrow}" alt="Arrow">
          <div class="${style.filters__right__size__menu}">
            <div>
              <input type="checkbox">XS
            </div>
            <div>
              <input type="checkbox">S
            </div>
            <div>
              <input type="checkbox">M
            </div>
            <div>
              <input type="checkbox">L
            </div>
          </div>
        </div>
        <div class="${style.filters__right__price}">
          <span>PRICE</span>
          <img src="${imgArrow}" alt="Arrow">
        </div>
      </div>
    </nav>
    <div id="fetured__cards" class="${styleMain.fetured__cards} ${styleGlobal.container}"></div>
    <div class="${style.block} ${styleGlobal.container}">
      <nav id="paginationBlock" class="${style.pagination}">
        <img data-id="arrowLeft" src="${imgArrowLeft}" alt="ArrowLeft">
        <div id="pagination" class="${style.pagination__pages}"></div>
        <img data-id="arrowRight" src="${imgArrowRight}" alt="ArrowRight">
      </nav>
    </div>
    <div class="${styleMain.services}">
      <div class="${styleGlobal.container}">
        <div class="${styleMain.services__wrap}">
          <div class="${styleMain.services__wrap__unit}">
            <img src="${imgForma1}" alt="photo">
            <h3 class="${styleMain.h3__forma_1}">Free Delivery</h3>
            <p>Worldwide delivery on all. 
              Authorit tively morph next-generation innov tion with extensive models.
            </p>
          </div>
          <div class="${styleMain.services__wrap__unit}">
            <img src="${imgForma2}" alt="photo">
            <h3 class="${styleMain.h3__forma_2}">Sales & discounts</h3>
            <p>Worldwide delivery on all. 
              Authorit tively morph next-generation innov tion with extensive models.
            </p>
          </div>
          <div class="${styleMain.services__wrap__unit}">
            <img src="${imgForma3}" alt="photo">
            <h3 class="${styleMain.h3__forma_3}">Quality assurance</h3>
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