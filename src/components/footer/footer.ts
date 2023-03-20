import styleGlobal from '../../global.module.scss';
import style from './footer.module.scss';
import imgIntersect from 'images/Intersect.png';
import imgFacebook from 'images/facebook-f-brands.svg';
import imgInstagram from 'images/instagram-brands.svg';
import imgPinterest from 'images/pinterest-p.svg';
import imgTwitter from 'images/twitter.svg';

export const footer = () => {
  const footerHtmlEl = document.getElementById('footer');

  footerHtmlEl ?
    footerHtmlEl.innerHTML = `
    <div class="${style.subscribe}">
      <div class="${styleGlobal.container}">
        <div class="${style.subscribe__blocks}">
          <div class="${style.subscribe__blocks__left}">
            <img src="${imgIntersect}" alt="photo">
            <div class="${style.subscribe__blocks__left__usertext}">
              “Vestibulum quis porttitor dui! Quisque viverra nunc mi, 
                <span>
                  a pulvinar purus condimentum“
                </span>
            </div>
          </div>
          <div class="subscribe__blocks__right">
            <div class="${style.subscribe__blocks__right__subscribeTitle}">
              SUBSCRIBE
            </div>
            <div class="${style.subscribe__blocks__right__subscribeText}">
              FOR OUR NEWLETTER AND PROMOTION
            </div>
            <form action="#" class="${style.subscribe__blocks__right__form}">
              <input type="email" placeholder="Enter Your Email">
              <button type="submit" >Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="${style.footer}">
      <div class="${styleGlobal.container}">
        <div class="${style.footer__block}">
          <div class="${style.footer__block__left}">
            © 2021 Brand All Rights Reserved.
          </div>
          <div class="${style.footer__block__right}">
            <a 
              href="https://www.facebook.com" 
              class="${style.footer__block__right__link}" 
              target="_blank"
            > 
              <img src="${imgFacebook}" alt="facebook">
            </a>
            <a 
              href="https://www.instagram.com" 
              class="${style.footer__block__right__link}" 
              target="_blank"
            > 
              <img src="${imgInstagram}" alt="instagram">
            </a>
            <a 
              href="https://www.pinterest.ru" 
              class="${style.footer__block__right__link}" 
              target="_blank"
            > 
              <img src="${imgPinterest}" alt="pinterest-p">
            </a>
            <a 
              href="https://twitter.com" 
              class="${style.footer__block__right__link}" 
              target="_blank"
            > 
              <img src="${imgTwitter}" alt="twitter">
            </a>
          </div>
        </div>
      </div>
    </div>
  ` :
    '';
};