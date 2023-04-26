import styleGlobal from '../../global.module.scss';
import styleCart from '../cart/cart.module.scss';
import { user } from '../user/user';
import style from './registration.module.scss';
import imgArrowRightWhite from 'images/arrowRight_white.svg';
import imgCheckMark from 'images/check_mark.svg';

export const registration = () => {
  const registrationHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    const inputFirstName: HTMLInputElement | null = document.querySelector('#firstName');
    const inputLastName: HTMLInputElement | null = document.querySelector('#lastName');
    const inputLoginReg: HTMLInputElement | null = document.querySelector('#loginReg');
    const inputPasswordReg: HTMLInputElement | null = document.querySelector('#passwordReg');
    const formEl: HTMLFormElement | null = document.querySelector('#formRegist');

    let firstName: string;
    let lastName: string;    
    let login: string;
    let password: string;

    inputFirstName?.addEventListener('change', () => firstName = inputFirstName.value);
    inputLastName?.addEventListener('change', () => lastName = inputLastName.value);
    inputLoginReg?.addEventListener('change', () => login = inputLoginReg.value);
    inputPasswordReg?.addEventListener('change', () => password = inputPasswordReg.value);
    
    formEl?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = new FormData(formEl);
      let gender = '';
      for (const entry of data) {
        gender = entry[1].toString();
      };
      user.postUserJson(
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          login: login,
          password: password,
          cartContents: [],
        }
      );
    });
  }).catch((err: Error) => console.log(err));

  registrationHtmlEl ?
    registrationHtmlEl.innerHTML = `
    <div class="${styleCart.shopping}">
      <div class="${styleGlobal.container}">
        <div class="${styleCart.shopping__header}">REGISTRATION</div>
      </div>
    </div>
    <div class="${style.registration} ${styleGlobal.container}">
      <form id="formRegist">
        <div class="${style.registration__login}">
          <h4>Your Name</h4>
          <input 
            id="firstName"
            class="${style.registration__login__inputFirst} ${style.registration__login__input}"" 
            type="text" 
            placeholder="First Name"
          ></input>
          <input 
            id="lastName"
            class="${style.registration__login__input}"
            type="text" 
            placeholder="Last Name"
          ></input>
          <div class="${style.registration__login__inputRadio}">
            <input type="radio" name="gender" id="Male" value="Male"><span>Male</span>
            <input type="radio" name="gender" id="Female" value="Female"><span>Female</span>
            <input type="radio" name="gender" id="Other" value="Other"><span>Other</span>
          </div>
          <h4>Login details</h4>
          <input 
            id="loginReg"
            class="${style.registration__login__inputFirst} ${style.registration__login__input}" 
            type="email" 
            placeholder="Email"
          ></input>
          <p 
            id="errorReg" 
            class="${style.registration__login__errorReg} ${style.registration__login__errorReg__none}"
          >This login already exists</p>
          <input 
            id="passwordReg"
            class="${style.registration__login__input}"
            type="password" 
            placeholder="Password"
          ></input>
          <p class="${style.registration__login__info}">
            Please use 8 or more characters, with at least 1 number and a 
            mixture of uppercase and lowercase letters
          </p>
          <button type="submit">
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