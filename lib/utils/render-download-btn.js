import downloadResults from './download-results';

export default function renderDownloadButton({
  element,
  label = 'Download',
  type = 'json',
  data,
} = {}) {
  const btnClass = 'keen-dataviz-button';
  const isBtnRendered = [...element.parentNode.children]
    .find(child => child.className === btnClass);
  if (isBtnRendered) return;

  const button = document.createElement('button');
  button.innerText = label;
  button.className = btnClass;
  button.addEventListener('click', event => downloadResults({ event, type, data}));
  element.parentNode.insertBefore(button, element.nextSibling);
};