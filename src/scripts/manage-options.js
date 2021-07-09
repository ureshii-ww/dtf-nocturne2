import {options_list} from '../config/options_list';

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