import { CartProduct } from "src/frontend/types";
import style from './cartUser.module.scss';
import styleHeader from '../header/header.module.scss';
import imgClose from 'images/close_2.svg';
import { user } from "../user/user";
import { productsList } from "../goods/goods";

export class CartList {
  quantityCart: number;
  sumCart: number;

  constructor() {
    this.quantityCart = 0;
    this.sumCart = 0;
  }

  checkAuth() {
    return JSON.parse(localStorage.getItem('user')!).auth;
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

  async postCartJson(
      method: string, 
      userLogin: string, 
      data: CartProduct,
      productIdDel?: number,
    ) {
    try {
      const response = await fetch(`/cart/${userLogin}`, {
        method: `${method}`,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const data_1 = await response.json();
      user.changeLocalStorageAuth(data_1);
      if(productIdDel) {
        document.getElementById(`cart_${productIdDel.toString()}`)?.remove();
      }
      this._updateHeaderCart();
    } catch (err) {
      return err;
    }
  }

  async deleteCartJson (userLogin: string, element: HTMLElement) {
    try {
      const response = await fetch(`/cart/${userLogin}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data_1 = await response.json();
      user.changeLocalStorageAuth(data_1);
      element.innerHTML = '';
      this._updateHeaderCart();
    } catch (err) {
      return err;
    }
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
      const userLogin: string = JSON.parse(localStorage.getItem('user')!).login;
      const cartContents: CartProduct[] = JSON.parse(localStorage.getItem('user')!).cartContents;
      const find = cartContents.find((product) => product.id === productId);
      if (find) {
        find.quantity++;
        if(this.checkAuth()) {
          this.postCartJson('PUT', userLogin, find);
        } else {
          const findIdx = cartContents.findIndex((product) => product.id === productId);
          cartContents[findIdx] = find;
          user.changeLocalStorageAnonym(cartContents);
        }
      } else {
        const product = productsList.products.find(product => product.id === productId);
        if(product) {
          const newProduct = Object.assign(product, {quantity: 1});
          if(this.checkAuth()) {
            this.postCartJson('POST', userLogin, newProduct);
          } else {
            cartContents.push(newProduct);
            user.changeLocalStorageAnonym(cartContents);
          }
        }
      }
    }
  }

  _updateHeaderCart() {
    const headerCart = document.getElementById('quantityCart');
    const subTotal = document.getElementById('subTotal');
    const grandTotal = document.getElementById('grandTotal');
    const cartContents: CartProduct[] = JSON.parse(localStorage.getItem('user')!).cartContents;
    let overallQuantity = 0;
    for(const product of cartContents) {
      overallQuantity += product.quantity;
    }
    this.quantityCart = overallQuantity;
    if(this.quantityCart === 0) {
      headerCart?.classList.add(`${styleHeader.header__top__basketWrap__span}`);
    } else {
      headerCart!.textContent = `${overallQuantity}`;
      headerCart?.classList.remove(`${styleHeader.header__top__basketWrap__span}`);
    }
    this.sumCart = cartContents.reduce((accum, item) => accum + item.price * item.quantity, 0);
    if(location.hash === '#cart' && subTotal && grandTotal) {
      subTotal!.textContent = `$${this.sumCart.toFixed(2).toString()}`;
      grandTotal!.textContent = `$${this.sumCart.toFixed(2).toString()}`;
    }
  }

  removeProduct(element: HTMLElement) {
    const productIdDel = Number(element.dataset['id']);
    if(productIdDel) {
      const cartContents: CartProduct[] = JSON.parse(localStorage.getItem('user')!).cartContents;
      const userLogin: string = JSON.parse(localStorage.getItem('user')!).login;
      const find = cartContents.find(product => product.id === productIdDel);
      if(find) {
        if(this.checkAuth()) {
          this.postCartJson('PATCH', userLogin, find, productIdDel);
        } else {
          const findIdx = cartContents.findIndex((product) => product.id === productIdDel);
          cartContents.splice(findIdx, 1);
          user.changeLocalStorageAnonym(cartContents, null, productIdDel);
        }
      }
    }
  }

  removeAllCart(element: HTMLElement) {
    const userLogin: string = JSON.parse(localStorage.getItem('user')!).login;
    let cartContents: CartProduct[] = JSON.parse(localStorage.getItem('user')!).cartContents;
    if(this.checkAuth()) {
      this.deleteCartJson(userLogin, element);
    } else {
      cartContents = []
      user.changeLocalStorageAnonym(cartContents, element);
    }
  }

  changeQuantity(element: HTMLInputElement) {
    const productIdInput = Number(element.dataset['quantity']);
    if(productIdInput) {
      const userLogin: string = JSON.parse(localStorage.getItem('user')!).login;
      const cartContents: CartProduct[] = JSON.parse(localStorage.getItem('user')!).cartContents;
      const find = cartContents.find(product => product.id === productIdInput);
      if(find) {
        find.quantity = Number(element.value);
        if(this.checkAuth()) {
          this.postCartJson('PUT', userLogin, find);
        } else {
          const findIdx = cartContents.findIndex((product) => product.id === productIdInput);
          cartContents[findIdx] = find;
          user.changeLocalStorageAnonym(cartContents);
        }
      }
    }
  }

  renderCart() {
    const cartHtmlEl = document.getElementById('cart');
    for (const cartProduct of JSON.parse(localStorage.getItem('user')!).cartContents) {
      cartHtmlEl ?
        cartHtmlEl.insertAdjacentHTML('beforeend', this.getHTMLStringCart(cartProduct)) :
        '';
    }
  }
}

export const cartList = new CartList();