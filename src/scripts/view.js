export default class View {
  constructor() {
    this.siteHeader = document.getElementsByClassName('site-header')[0];
    this.optionsButtonWrapper = this._createOptionsButton();
    this.dropdown = this._createDropdown();
    this.optionsItems = [];
  
    this._addDropdownEventListeners();
  }
  
  createStyleElement(css) {
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
  
  addInitialOptionsClasses(options) {
    for (let option in options) {
      if (options[option].value) {
        document.body.classList.add(option)
      }
    }
  }
  
  createOptionsItems(options) {
    for (const option in options) {
      const optionItem = this._createOptionsItem(option, options[option].value, options[option].description);
      this.dropdown.appendChild(optionItem);
      this.optionsItems.push(optionItem);
    }
  }
  
  bindToggleOption(handler) {
    this.optionsItems.forEach(optionItem => {
      optionItem.addEventListener('click', e => {
        e.stopPropagation();
        
        if (e.currentTarget.isEnabled) {
          handler(e.currentTarget.value, 'disable');
          e.currentTarget.isEnabled = false;
          document.body.classList.remove(e.currentTarget.value);
        } else {
          handler(e.currentTarget.value, 'enable');
          e.currentTarget.isEnabled = true;
          document.body.classList.add(e.currentTarget.value);
        }
  
        e.currentTarget.getElementsByClassName('uww-options__toggle')[0]
          .classList.toggle('uww-options__toggle--checked');
      })
    })
  }
  
  _createOptionsButton() {
    const optionsButtonWrapper = document.createElement('div');
    optionsButtonWrapper.className = 'site-header__item uww-options';
  
    const optionsButton = document.createElement('div');
    optionsButton.className = 'uww-options__header-button';
    optionsButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon uww-options__moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    `
    optionsButtonWrapper.appendChild(optionsButton);
    
    this.siteHeader.insertBefore(optionsButtonWrapper, this.siteHeader.children[7]);
  
    return optionsButtonWrapper;
  }
  
  _createDropdown() {
    const optionsDropdown = document.createElement('div');
    optionsDropdown.className = 'uww-options__dropdown';
    this.optionsButtonWrapper.appendChild(optionsDropdown);
    
    return optionsDropdown;
  }
  
  _createOptionsItem(option, value, description) {
    const optionItem = document.createElement('label');
    optionItem.className = 'uww-options__item';
    optionItem.innerHTML = `<span>${description}</span>`;
    optionItem.value = option;
    optionItem.isEnabled = value;
  
    const toggle = document.createElement('div');
    toggle.className = 'uww-options__toggle';
    if (value) {
      toggle.classList.add('uww-options__toggle--checked');
    }
    optionItem.appendChild(toggle);
  
    return optionItem;
  }
  
  _addDropdownEventListeners() {
    const optionsButton = this.optionsButtonWrapper.getElementsByClassName('uww-options__header-button')[0];
    
    optionsButton.addEventListener('click', ev => {
      ev.stopPropagation();
      ev.currentTarget.classList.toggle('uww-options__header-button--opened')
      document.getElementsByClassName('uww-options__dropdown')[0].classList.toggle('uww--show');
    });
  
    window.addEventListener('click', ev => {
      if (!ev.target.classList.contains('uww-options__dropdown')) {
        document.getElementsByClassName('uww-options__dropdown')[0]
          .classList.remove('uww--show');
      
        const headerButton = document.getElementsByClassName('uww-options__header-button')[0];
        if (headerButton.classList.contains('uww-options__header-button--opened')) {
          headerButton.classList.toggle('uww-options__header-button--opened')
        }
      }
    });
  
    this.dropdown.addEventListener('click', ev => {
      ev.stopPropagation();
    });
  }
  
}