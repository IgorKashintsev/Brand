import { footer } from './components/footer/footer';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { init } from './components/router';


window.addEventListener('DOMContentLoaded', () => {
  header();
  main();
  init();
  footer();
});