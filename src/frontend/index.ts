import { footer } from './components/footer/footer';
import { productsList } from './components/goods/goods';
import { header } from './components/header/header';
import { init } from './components/router';


window.addEventListener('DOMContentLoaded', () => {
  const runApp = async () => {
    await productsList.fetchProducts();
    header();
    init();
    footer();
  }

  runApp();
});