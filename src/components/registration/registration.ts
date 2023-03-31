import styleGlobal from '../../global.module.scss';
import styleCart from '../cart/cart.module.scss';
import style from './registration.module.scss';
import imgArrowRightWhite from 'images/arrowRight_white.svg';
import imgCheckMark from 'images/check_mark.svg';

export const registration = () => {
  const registrationHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);

  registrationHtmlEl ?
    registrationHtmlEl.innerHTML = `
    <div class="${styleCart.shopping}">
      <div class="${styleGlobal.container}">
        <div class="${styleCart.shopping__header}">REGISTRATION</div>
      </div>
    </div>
    <div class="${style.registration} ${styleGlobal.container}">
      <form action="#">
        <div class="${style.registration__login}">
          <h4>Your Name</h4>
          <input 
            class="${style.registration__login__inputFirst}" 
            type="text" 
            placeholder="First Name"
          ></input>
          <input type="text" placeholder="Last Name">
          <div class="${style.registration__login__inputRadio}">
            <input type="radio" name="a" id="Male"><span>Male</span>
            <input type="radio" name="a" id="Female"><span>Female</span>
            <input type="radio" name="a" id="Other"><span>Other</span>
          </div>
          <h4>Login details</h4>
          <input 
            class="${style.registration__login__inputFirst}" 
            type="email" 
            placeholder="Email"
          ></input>
          <input type="password" placeholder="Password">
          <p>
            Please use 8 or more characters, with at least 1 number and a 
            mixture of uppercase and lowercase letters
          </p>
          <button>
            JOIN NOW 
            <img src="${imgArrowRightWhite}" alt="arrowRight_white">
          </button>
        </div>
      </form>
      <div class="${style.registration__loyalty}">
        <h3>LOYALTY HAS ITS PERKS</h3>
        <p>
          Get in on the loyalty program where you can earn points and unlock serious perks. 
          Starting with these as soon as you join:
        </p>
        <div class="${style.registration__loyalty__perks}">
          <div>
            <img src="${imgCheckMark}" alt="check_mark">
            15% off welcome offer
          </div>
          <div>
            <img src="${imgCheckMark}" alt="check_mark">
            Free shipping, returns and exchanges on all orders
          </div>
          <div>
            <img src="${imgCheckMark}" alt="check_mark">
            $10 off a purchase on your birthday
          </div>
          <div>
            <img src="${imgCheckMark}" alt="check_mark">
            Early access to products
          </div>
          <div>
            <img src="${imgCheckMark}" alt="check_mark">
            Exclusive offers & rewards
          </div>
        </div>
      </div>
    </div>
  ` :
    '';
};