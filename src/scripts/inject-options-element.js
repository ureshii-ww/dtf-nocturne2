import {enableOption, disableOption} from './manage-options';


//Кнопка в хедере
const createOptionsButton = () => {
  const optionsButtonWrapper = document.createElement('div');
  optionsButtonWrapper.className = 'site-header__item uww-options';
  
  const optionsButton = document.createElement('div');
  optionsButton.className = 'uww-options__header-button';
  optionsButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon uww-options__moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  `
  optionsButtonWrapper.appendChild(optionsButton);
  
  const siteHeader = document.getElementsByClassName('site-header')[0];
  siteHeader.insertBefore(optionsButtonWrapper, siteHeader.children[7]);
  
  return optionsButtonWrapper;
}

//Создаем блок конкретной опции.
//Очоба оборачивает инпуты чекбоксов,
//поэтому вместо тогглов на них городим вот это.
const createOptionsItem = (option, options) => {
  const optionItem = document.createElement('label');
  optionItem.className = 'uww-options__item';
  optionItem.innerHTML = `<span>${options[option].description}</span>`;
  optionItem.value = option;
  optionItem.isEnabled = options[option].value;
  
  const toggle = document.createElement('div');
  toggle.className = 'uww-options__toggle';
  if (options[option].value) {
    toggle.classList.add('uww-options__toggle--checked');
  }
  optionItem.appendChild(toggle);
  
  optionItem.addEventListener('click', ev => {
    ev.stopPropagation();
    
    if (ev.currentTarget.isEnabled) {
      disableOption(ev.currentTarget.value);
      ev.currentTarget.isEnabled = false;
    } else {
      enableOption(ev.currentTarget.value);
      ev.currentTarget.isEnabled = true;
    }
    
    ev.currentTarget.getElementsByClassName('uww-options__toggle')[0]
      .classList.toggle('uww-options__toggle--checked');
  });
  
  return optionItem;
}

//Дропдаун для опций
const createOptionsDropdown = (options, optionsWrapper) => {
  const optionsDropdown = document.createElement('div');
  optionsDropdown.className = 'uww-options__dropdown';
  
  for (const option in options) {
    const optionsItem = createOptionsItem(option, options);
    optionsDropdown.appendChild(optionsItem);
  }
  
  optionsWrapper.appendChild(optionsDropdown);
}

//Листенеры для открытия/закрытия дропдауна
const addDropdownEventListeners = () => {
  const optionsButton = document.getElementsByClassName('uww-options__header-button')[0];
  const optionsDropdown = document.getElementsByClassName('uww-options__dropdown')[0];
  
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
  
  optionsDropdown.addEventListener('click', ev => {
    ev.stopPropagation();
  });
}

export const injectOptionsElement = (options) => {
  const optionsWrapper = createOptionsButton();
  createOptionsDropdown(options, optionsWrapper);
  addDropdownEventListeners();
}