import { Product } from "src/types";
import style from './goods.module.scss';
import imgVector from 'images/Vector.svg';
import img1 from 'images/Rectangle_15_copy_1.png';
import img2 from 'images/Rectangle_15_copy_2.png';
import img3 from 'images/Rectangle_15_copy_3.png';
import img4 from 'images/Rectangle_15_copy_4.png';
import img5 from 'images/Rectangle_15_copy_5.png';
import img6 from 'images/Rectangle_15_copy_6.png';
import img7 from 'images/Rectangle_15_copy_7.png';
import img8 from 'images/Rectangle_15_copy_8.png';
import img9 from 'images/Rectangle_15_copy_9.png';
import img10 from 'images/Rectangle_15_copy_10.png';
import img11 from 'images/Rectangle_15_copy_11.png';
import img12 from 'images/Rectangle_15_copy_12.png';

class ProductsList {
  products: Product[] | undefined;

  constructor() {
    this.products = [];
    this.fetchGoods();
  }

  fetchGoods() {
    this.products = [
      { id: 1, image: img1 },
      { id: 2, image: img2 },
      { id: 3, image: img3 },
      { id: 4, image: img4 },
      { id: 5, image: img5 },
      { id: 6, image: img6 },
      { id: 7, image: img7 },
      { id: 8, image: img8 },
      { id: 9, image: img9 },
      { id: 10, image: img10 },
      { id: 11, image: img11 },
      { id: 12, image: img12 },
    ];
  }

  getHTMLString(i: number) {
    return `
      <div id="${this.products![i].id}" class="${style.fetured__card}">
        <div class="${style.fetured__card__wrap}">
          <img class="${style.fetured__card__wrap__img}" src="${this.products![i].image}" alt="photo">
          <div class="${style.fetured__card__wrap__imgDark}">
            <button>
              <img src="${imgVector}" alt="Vector">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="${style.fetured__card__name}">
          ELLERY X M'O CAPSULE
        </div>
        <div class="${style.fetured__card__text}">
          Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym
          Ellery
          teams
          up with Moda Operandi.
        </div>
        <div class="${style.fetured__card__price}">
            $52.00
        </div>
      </div>
    `;
  }
}
export const productsList = new ProductsList();