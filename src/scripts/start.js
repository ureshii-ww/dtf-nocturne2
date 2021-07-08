import { makeClassMap } from './make-class-map';
import { replaceClassesInCss } from './replace-classes-in-css';
import { injectCss } from './inject-css';
import { manageOptions } from './manage-options';

const initialCss = require('../styles/index.scss').toString();

export const start = () => {
  //Временный плейсхолдер
  const head = document.getElementsByTagName('head')[0];
  const placeholder = document.createElement('style');
  placeholder.type = "text/css";
  placeholder.innerHTML = '* {background-color: #121212 !important; color: #121212; !important} div {display: none !important;}';
  placeholder.id = 'placeholder';
  head.appendChild(placeholder);
  
  //Выполняем замену стилей после загрузки страницы
  window.onload = () => {
    const classMap = makeClassMap();
    const modifiedCss = replaceClassesInCss(initialCss, classMap);
    manageOptions();
    injectCss(modifiedCss);
    //Удаляем плейсхолдер
    head.removeChild(placeholder);
  }
}