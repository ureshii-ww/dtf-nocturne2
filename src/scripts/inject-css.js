export const injectCss = (css) => {
  const newCss = document.createElement('style');
  newCss.type = "text/css";
  newCss.id = 'DTF Nocturne';
  newCss.innerHTML = css;
  document.body.appendChild(newCss);
  if (window.location.href.includes('https://vc.ru')) {
    document.body.classList.add('uww-site-vc');
  }
  if (window.location.href.includes('https://tjournal.ru')) {
    document.body.classList.add('uww-site-tj');
  }
}