export const createPlaceholder = () => {
  const placeholder = document.createElement('div');
  placeholder.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #121212; z-index: 1000';
  placeholder.id = 'uww-placeholder';
  const placeholderHead = document.createElement('div');
  placeholderHead.style.cssText = ''
  document.body.appendChild(placeholder);
  console.log('created');
}

export const destroyPlaceholder = () => {
  const placeholder = document.getElementById('uww-placeholder');
  placeholder.parentElement.removeChild(placeholder);
  console.log('destroyed');
}

