export const injectCss = (css) => {
  const newCss = document.createElement('style');
  newCss.type = "text/css";
  newCss.id = 'DTF Nocturne';
  newCss.innerHTML = css;
  document.body.appendChild(newCss);
}