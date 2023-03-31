import styleGlobal from '../../global.module.scss';
import style from './cart.module.scss';
import { cartList } from '../goods/goods';

export const cart = () => {
  const cartHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    cartList.renderCart();
    const blockCart: HTMLDivElement | null = document.querySelector('#cart');
    const clearCartBtn: HTMLButtonElement | null = document.querySelector('#clearCart');
    const shoppingBtn: HTMLButtonElement | null = document.querySelector('#shopping');
    cartList.handleClickDeleteBtn(blockCart!);
    cartList.handleChangeQuantity(blockCart!);
    clearCartBtn?.addEventListener('click', () => cartList.removeAllCart(blockCart!));
    shoppingBtn?.addEventListener('click', () => location.hash = 'catalog');
  }).catch((err: Error) => console.log(err));

  cartHtmlEl ?
    cartHtmlEl.innerHTML = `
    <div class="${style.shopping}">
      <div class="${styleGlobal.container}">
        <div class="${style.shopping__header}">SHOPPING CART</div>
      </div>
    </div>
    <div class="${styleGlobal.container}">
      <div class="${style.shoppingCart}">
        <div class="${style.shoppingCart__cards}">
          <div id="cart" ></div>
          <div class="${style.shoppingCart__cards__buttons}">
            <button id="clearCart" >Clear shopping cart</button>
            <button id="shopping" >Continue shopping</button>
          </div>
        </div>
        <div class="${style.shoppingCart__shipping}">
          <form action="#">
            <div class="${style.shoppingCart__shipping__adress}">
              <h3>SHIPPING ADRESS</h3>
              <input type="text" placeholder="Bangladesh">
              <input type="text" placeholder="State">
              <input type="text" placeholder="Postcode / Zip">
              <button type="button" >Get a quote</button>
            </div>
          </form>
          <div class="${style.shoppingCart__shipping__proceed}">
            <div 
              class="${style.shoppingCart__shipping__proceed__sub}"
            >SUB TOTAL <span id="subTotal" >$${cartList.sumCart.toFixed(2)}</span>
            </div>
            <div 
              class="${style.shoppingCart__shipping__proceed__grand}"
            >GRAND TOTAL <span id="grandTotal" >$${cartList.sumCart.toFixed(2)}</span>
            </div>
            <div class="${style.shoppingCart__shipping__proceed__checkout}">
              <div 
                class="${style.shoppingCart__shipping__proceed__checkout__dividerGray}"
              ></div>
              <button type="button" >PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ` :
    '';
};