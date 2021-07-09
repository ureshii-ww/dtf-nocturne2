import options_list from '../config/options_list';

export const restoreOptions = () => {
  let options = {...options_list};
  let savedOptions = JSON.parse(localStorage.getItem('uww-noct-opt'));
  
  if (savedOptions) {
    options = { ...options, ...savedOptions };
  }
  
  localStorage.setItem('uww-noct-opt', JSON.stringify(options));
  
  for (let option in options) {
    if (options[option].value) {
      document.body.classList.add(option)
    }
  }
  
  return options;
}

export const enableOption = (option) => {
  const options = JSON.parse(localStorage.getItem('uww-noct-opt'));
  options[option].value = true;
  document.body.classList.add(option);
  localStorage.setItem('uww-noct-opt', JSON.stringify(options));
}

export const disableOption = (option) => {
  const options = JSON.parse(localStorage.getItem('uww-noct-opt'));
  options[option].value = false;
  document.body.classList.remove(option);
  localStorage.setItem('uww-noct-opt', JSON.stringify(options));
}