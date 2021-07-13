import options_list from '../config/options_list';

export default class OptionsModel {
  constructor() {
    this.options = this._restoreOptions();
  }
  
  _restoreOptions() {
    let options = JSON.parse(JSON.stringify(options_list));
    let savedOptions = JSON.parse(localStorage.getItem('uww-noct-opt'));
    
    if (savedOptions) {
      for (const option in savedOptions) {
        if (!options[option]) {
          delete savedOptions[option];
        }
      }
      options = { ...options, ...savedOptions };
    }
    
    localStorage.setItem('uww-noct-opt', JSON.stringify(options));
    
    return options;
  }
  
  enableOption(option) {
    this.options[option].value = true;
    localStorage.setItem('uww-noct-opt', JSON.stringify(this.options));
  }
  
  disableOption(option) {
    this.options[option].value = false;
    localStorage.setItem('uww-noct-opt', JSON.stringify(this.options));
  }
}