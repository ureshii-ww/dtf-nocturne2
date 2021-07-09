export const restoreOptions = () => {
  let options = JSON.parse(localStorage.getItem('uww-noct-opt'));
  if (!options) {
    const defaultOptions = {
      uww_scrollbar: true,
      uww_likes: true
    }
    localStorage.setItem('uww-noct-opt', JSON.stringify(defaultOptions));
    options = defaultOptions;
  }
  
  for (let option in options) {
    if (options[option]) {
      document.body.classList.add(option)
    }
  }
  
  return options;
}