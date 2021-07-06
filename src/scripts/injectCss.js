export const injectCss = (css) => {
  const head = document.getElementsByTagName('head')[0];
  const newCss = document.createElement('style');
  newCss.type = "text/css";
  newCss.id = 'IM HERE';
  newCss.innerHTML = css;
  head.appendChild(newCss);
}