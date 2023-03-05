import { catalog } from "./catalog/catalog";
import { main } from "./main/main";

const handleHash = () => {
  const hash = location.hash ? location.hash.slice(1) : '';
  switch(hash) {
    case('catalog'):
    catalog();
    break;
    case('main'):
    main();
    break;
  }
}

export const init = () => {
  addEventListener('hashchange', handleHash)
}