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

const createOptionsDropdown = (options, optionsWrapper) => {
  const optionsDropdown = document.createElement('div');
  optionsDropdown.className = 'uww-options__dropdown';
  for (const option in options) {
    const optionElement = document.createElement('div');
    optionElement.className = 'uww-options__item';
    optionElement.innerHTML = `
      <div class="uww-options__title">${option}</div>
    `
    optionsDropdown.appendChild(optionElement);
  }
  optionsDropdown.addEventListener('click', ev => {
    ev.stopPropagation();
  })
  
  optionsWrapper.appendChild(optionsDropdown);
}

const addEventListeners = () => {
  const optionsButton = document.getElementsByClassName('uww-options__header-button')[0];
  const optionsDropdown = document.getElementsByClassName('uww-options__dropdown')[0];
  
  optionsButton.addEventListener('click', ev => {
    ev.stopPropagation();
    document.getElementsByClassName('uww-options__dropdown')[0].classList.toggle('uww--show');
  });
  
  window.addEventListener('click', ev => {
    if (!ev.target.classList.contains('uww-options__dropdown')) {
      document.getElementsByClassName('uww-options__dropdown')[0].classList.remove('uww--show');
    }
  });
  
  optionsDropdown.addEventListener('click', ev => {
    ev.stopPropagation();
  });
}

export const injectOptionsElement = (options) => {
  const optionsWrapper = createOptionsButton();
  createOptionsDropdown(options, optionsWrapper);
  addEventListeners();
}