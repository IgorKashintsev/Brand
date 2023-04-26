import styleGlobal from '../../global.module.scss';
import styleCart from '../cart/cart.module.scss';
import { user } from '../user/user';
import style from './signin.module.scss';
import imgArrowRightWhite from 'images/arrowRight_white.svg';

export const signIn = () => {
  const signInHtmlEl = document.getElementById('result');
  window.scrollTo(0,0);

  const promise = new Promise(function(resolve, reject) {
    resolve('done');
    reject((err: Error) => console.log(err));
  });

  promise.then(() => {
    const butRegist: HTMLDivElement | null = document.querySelector('#regist');
    const inputLogin: HTMLInputElement | null = document.querySelector('#login');
    const inputPassword: HTMLInputElement | null = document.querySelector('#password');
    const formEl: HTMLFormElement | null = document.querySelector('#formLog');
    let login: string;
    let password: string;
    inputLogin?.addEventListener('change', () => login = inputLogin.value);
    inputPassword?.addEventListener('change', () => password = inputPassword.value);
    formEl?.addEventListener('submit', (ev) => {
      ev.preventDefault();
      user.getUserJson(
        {
          login: login,
          password: password
        }
      );
    });
    butRegist?.addEventListener('click', () => location.hash = 'registration');
  }).catch((err: Error) => console.log(err));

  signInHtmlEl ?
    signInHtmlEl.innerHTML = `
    <div class="${styleCart.shopping}">
      <div class="${styleGlobal.container}">
        <div class="${styleCart.shopping__header}">SIGN IN</div>
      </div>
    </div>
    <div class="${style.registration} ${styleGlobal.container}">
      <form id="formLog" class="${style.registration__login} ${style.adaptive}">
        <h4>Login details</h4>
        <input 
          id="login"
          class="${style.registration__login__inputFirst} ${style.registration__login__input}" 
          type="email" 
          placeholder="Email"
        ></input>
        <input 
          id="password"
          class="${style.registration__login__input}"
          type="password" 
          placeholder="Password"
        ></input>
        <p 
          id="errLog" 
          class="${style.registration__login__errorLog} ${style.registration__login__errorLog__none}"
        >Incorrect login or password</p>
        <div class="${style.registration__login__buttons}">
          <button type="submit">
            JOIN NOW 
            <img src="${imgArrowRightWhite}" alt="arrowRight_white">
          </button>
          <button id="regist" type="button">
            REGISTRATION 
            <img src="${imgArrowRightWhite}" alt="arrowRight_white">
          </button>
        </div>
      </form>
    </div>
  ` :
    '';
};