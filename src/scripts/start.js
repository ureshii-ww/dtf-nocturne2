import { makeClassMap } from './make-class-map';
import { replaceClassesInCss } from './replace-classes-in-css';
import { injectCss } from './inject-css';
import { restoreOptions } from './manage-options';
import { injectOptionsElement } from './inject-options-element';

const initialCss = require('../styles/index.scss').toString();

export const start = () => {
  //Временный плейсхолдер
  const placeholder = document.createElement('style');
  placeholder.type = "text/css";
  placeholder.innerHTML = '* {background-color: #121212 !important; color: #121212 !important;} div {display: none !important;}';
  const html = document.getElementsByTagName('html')[0];
  html.classList.add('uww-noct-html');
  html.appendChild(placeholder);
  
  //Выполняем замену стилей после загрузки страницы
  window.onload = () => {
    const classMap = makeClassMap();
    const modifiedCss = replaceClassesInCss(initialCss, classMap);
    const options = restoreOptions();
    injectOptionsElement(options);
    injectCss(modifiedCss);
    //Удаляем плейсхолдер
    html.removeChild(placeholder);
  }
}