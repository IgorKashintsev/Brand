import { cart } from './cart/cart';
import { cartList } from './cartUser/cartUser';
import { catalog } from './catalog/catalog';
import { main } from './main/main';
import { product } from './product/product';
import { registration } from './registration/registration';
import { signIn } from './signin/signin';

export const handleHash = () => {
  const  hash = location.hash ? location.hash.slice(1) : '';

  switch(hash) {
    case('catalog'):
      catalog();
      break;
    case(''):
      main();
      break;
    case('product'):
      product();
      break;
    case('signin'): {
        if(!cartList.checkAuth()) {
          signIn();
        } else {
          main();
        }
      }
      break;
    case('registration'):
      registration();
      break;
    case('cart'):
      cart();
      break;
  }
};

export const init = () => {
  addEventListener('hashchange', handleHash);
  handleHash()
};