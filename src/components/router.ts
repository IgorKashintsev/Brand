import { cart } from './cart/cart';
import { catalog } from './catalog/catalog';
import { main } from './main/main';
import { product } from './product/product';
import { registration } from './registration/registration';

const handleHash = () => {
  const hash = location.hash ? location.hash.slice(1) : '';
  switch(hash) {
  case('catalog'):
    catalog();
    break;
  case('main'):
    main();
    break;
  case('product'):
    product();
    break;
  case('user'):
    registration();
    break;
  case('cart'):
    cart();
    break;
  }
};

export const init = () => {
  addEventListener('hashchange', handleHash);
};