export const injectCss = (css) => {
  const body = document.getElementsByTagName('body')[0];
  const newCss = document.createElement('style');
  newCss.type = "text/css";
  newCss.id = 'DTF Nocturne';
  newCss.innerHTML = css;
  body.appendChild(newCss);
}