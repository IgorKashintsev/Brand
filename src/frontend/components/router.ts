import { cart } from './cart/cart';
import { cartList } from './cartUser/cartUser';
import { catalog } from './catalog/catalog';
import { main } from './main/main';
import { product } from './product/product';
import { signin } from './signin/signin';
import { login } from './login/login';

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
  case('login'): {
    if(!cartList.checkAuth()) {
      login();
    } else {
      main();
    }
  }
    break;
  case('signin'):
    signin();
    break;
  case('cart'):
    cart();
    break;
  }
};

export const init = () => {
  addEventListener('hashchange', handleHash);
  handleHash();
};