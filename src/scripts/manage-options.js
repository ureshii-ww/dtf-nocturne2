const toggleDropdown = () => {
  const dropdown = document.getElementsByClassName('uww-options__dropdown')[0];
  dropdown.classList.toggle('uww--hidden');
}

const restoreOptions = () => {
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

const createOptionsButton = () => {
  const optionsButtonWrapper = document.createElement('div');
  optionsButtonWrapper.className = 'site-header__item uww-options';
  const optionsButton = document.createElement('div');
  optionsButton.className = 'uww-options__header-button';
  optionsButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon uww-options__moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  `
  optionsButton.onclick = toggleDropdown;
  optionsButtonWrapper.appendChild(optionsButton);
  
  const siteHeader = document.getElementsByClassName('site-header')[0];
  siteHeader.insertBefore(optionsButtonWrapper, siteHeader.children[7]);
}

const createOptionsDropdown = (options) => {
  const optionsDropdown = document.createElement('div');
  optionsDropdown.className = 'uww-options__dropdown uww--hidden';
  for (const option in options) {
    const optionElement = document.createElement('div');
    optionElement.className = 'uww-options__item';
    optionElement.innerHTML = `
      <div class="uww-options__title">${option}</div>
    `
    optionsDropdown.appendChild(optionElement);
  }
  const optionsButton = document.getElementsByClassName('uww-options')[0];
  optionsButton.appendChild(optionsDropdown);
}

export const manageOptions = () => {
  const options = restoreOptions();
  createOptionsButton();
  createOptionsDropdown(options);
}