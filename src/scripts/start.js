import Controller from './controller';
import CssModel from './css.model';
import OptionsModel from './options.model';
import View from './view';

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
    const dtfNocturne = new Controller(new CssModel(), new OptionsModel(), new View())
    //Удаляем плейсхолдер
    html.removeChild(placeholder);
  }
}