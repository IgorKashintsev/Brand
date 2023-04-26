import { Product } from 'src/frontend/types';
import style from './goods.module.scss';
import imgVector from 'images/Vector.svg';

class ProductsList {
  products: Product[];

  constructor() {
    this.products = [];
  }

  async fetchProducts() {
    try {
      const response = await fetch('/goods');
      const data = await response.json();
      this.products = data; 
    } catch (err) {
      return err;
    }
  }

  getHTMLStringProduct(i: number) {
    return `
      <div id="${this.products![i].id}" class="${style.fetured__card}">
        <div class="${style.fetured__card__wrap}">
          <img class="${style.fetured__card__wrap__img}" src="${this.products![i].image}" alt="photo">
          <div 
            data-id="${this.products![i].id}"
            data-price="${this.products![i].price}"
            class="${style.fetured__card__wrap__imgDark}"
          >
            <button
              data-id="${this.products![i].id}"
              data-price="${this.products![i].price}"
              class="buy-btn"
            >
              <img src="${imgVector}" alt="Vector">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="${style.fetured__card__product}" onclick="location.hash = 'product'">
          <div class="${style.fetured__card__name}">
            ELLERY X M'O CAPSULE
          </div>
          <div class="${style.fetured__card__text}">
            Known for her sculptural takes on traditional tailoring, 
            Australian arbiter of cool Kym Ellery teams up with Moda Operandi.
          </div>
          <div class="${style.fetured__card__price}">
            $${this.products![i].price.toFixed(2)}
          </div>
        </div>
      </div>
    `;
  }
}

export const productsList = new ProductsList();