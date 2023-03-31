import { CartProduct, Product } from 'src/types';
import style from './goods.module.scss';
import styleHeader from '../header/header.module.scss';
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
import imgClose from 'images/close_2.svg';

class ProductsList {
  products: Product[] | undefined;

  constructor() {
    this.products = [];
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      { id: 1, image: img1, price: 52 },
      { id: 2, image: img2, price: 52 },
      { id: 3, image: img3, price: 52 },
      { id: 4, image: img4, price: 52 },
      { id: 5, image: img5, price: 52 },
      { id: 6, image: img6, price: 52 },
      { id: 7, image: img7, price: 52 },
      { id: 8, image: img8, price: 52 },
      { id: 9, image: img9, price: 52 },
      { id: 10, image: img10, price: 52 },
      { id: 11, image: img11, price: 52 },
      { id: 12, image: img12, price: 52 },
    ];
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

class CartList extends ProductsList {
  cartList: CartProduct[] | undefined;
  quantityCart: number;
  sumCart: number;

  constructor() {
    super();
    this.cartList = [];
    this.quantityCart = 4;
    this.sumCart = 208;
    this.fetchCartProducts();
  }

  fetchCartProducts() {
    this.cartList = [
      { id: 3, image: img3, price: 52, quantity: 2 },
      { id: 7, image: img7, price: 52, quantity: 2  },
    ];
  }

  getHTMLStringCart(cartProduct: CartProduct) {
    return `
      <div 
        id="cart_${cartProduct.id}"
        class="${style.shoppingCart__cards__mangoPeople}"
      >
        <img src="${cartProduct.image}" alt="cart_1">
        <div class="${style.shoppingCart__cards__mangoPeople__info}">
          <h2>MANGO PEOPLE T-SHIRT</h2>
          <img data-id="${cartProduct.id}" src="${imgClose}" alt="close_2">
          <ul>
            <li>Price: 
              <span 
                class="${style.shoppingCart__cards__mangoPeople__info__price}"
              >$${cartProduct.price.toFixed(2)}</span>
            </li>
            <li>Color: Red</li>
            <li>Size: Xl</li>
            <li>Quantity: 
              <input 
                data-quantity="${cartProduct.id}"
                type="number"
                max="9"
                min="1"
                value="${cartProduct.quantity}"
                class="${style.shoppingCart__cards__mangoPeople__info__quantity}"
              ></input>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  handleClickBuyBtn(blockProducts: HTMLDivElement) {
    blockProducts?.addEventListener('click', ev => {
      this.addProduct(ev.target as HTMLElement);
    });
  }

  handleClickDeleteBtn(blockCart: HTMLDivElement) {
    blockCart?.addEventListener('click', ev => {
      this.removeProduct(ev.target as HTMLElement);
    });
  }

  handleChangeQuantity(blockCart: HTMLDivElement) {
    blockCart?.addEventListener('change', ev => {
      this.changeQuantity(ev.target as HTMLInputElement);
    });
  }

  addProduct(element: HTMLElement) {
    const productId = Number(element.dataset['id']);
    if(productId) {
      const find = this.cartList!.find(product => product.id === productId);
      if (find) {
        find.quantity++;
        this._updateHeaderCart();
      } else {
        const product = {
          id: productId,
          image: this.products!.find(product => product.id === productId)!.image,
          price: Number(element.dataset['price']),
          quantity: 1
        };
        this.cartList?.push(product);
        this._updateHeaderCart();
      }
    }
  }

  _updateHeaderCart() {
    const headerCart = document.getElementById('quantityCart');
    const subTotal = document.getElementById('subTotal');
    const grandTotal = document.getElementById('grandTotal');
    let overallQuantity = 0;
    for(const product of this.cartList!) {
      overallQuantity += product.quantity;
    }
    this.quantityCart = overallQuantity;
    if(this.quantityCart === 0) {
      headerCart?.classList.add(`${styleHeader.header__top__basketWrap__span}`);
    } else {
      headerCart!.textContent = `${overallQuantity}`;
      headerCart?.classList.remove(`${styleHeader.header__top__basketWrap__span}`);
    }
    this.sumCart = this.cartList!.reduce((accum, item) => accum + item.price * item.quantity, 0);
    if(location.hash === '#cart') {
      subTotal!.textContent = `$${this.sumCart.toFixed(2).toString()}`;
      grandTotal!.textContent = `$${this.sumCart.toFixed(2).toString()}`;
    }
  }

  removeProduct(element: HTMLElement) {
    const productIdDel = Number(element.dataset['id']);
    if(productIdDel) {
      const find = this.cartList!.find(product => product.id === productIdDel);
      if(find) {
        this.cartList!.splice(this.cartList!.indexOf(find), 1);
        document.getElementById(`cart_${productIdDel.toString()}`)?.remove();
        this._updateHeaderCart();
      }
    }
  }

  removeAllCart(element: HTMLElement) {
    this.cartList = [];
    this._updateHeaderCart();
    element.innerHTML = '';
  }

  changeQuantity(element: HTMLInputElement) {
    const productIdInput = Number(element.dataset['quantity']);
    if(productIdInput) {
      const findIdx = this.cartList!.findIndex(product => product.id === productIdInput);
      if(findIdx !== -1) {
        this.cartList![findIdx].quantity = Number(element.value);
        this._updateHeaderCart();
      }
    }
  }

  renderCart() {
    const cartHtmlEl = document.getElementById('cart');
    for (const cartProduct of this.cartList!) {
      cartHtmlEl ?
        cartHtmlEl.insertAdjacentHTML('beforeend', cartList.getHTMLStringCart(cartProduct)) :
        '';
    }
  }
}

export const cartList = new CartList();
export const productsList = new ProductsList();