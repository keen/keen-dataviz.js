import copyToClipboard from './copy-to-clipboard';

function removeClassWithTimeOut(element, className = 'copied', ms = 1000) {
  setTimeout(() => {
    element.classList.remove(className);
  }, ms);
}

function handleCopyToClipboard(event) {
  const { target, target: { nodeName } } = event;

  let value;
  if (nodeName === 'DD') {
    value = target.innerText;
    if (!target.classList.contains('copied')) {
      target.classList.add('copied');
      removeClassWithTimeOut(target);
    }
  }
  if (nodeName === 'DT') {
    value = target.nextSibling.innerText;
    if (!target.nextSibling.classList.contains('copied')) {
      target.nextSibling.classList.add('copied');
      removeClassWithTimeOut(target.nextSibling);
    }
  }

  copyToClipboard(value);
}

export default function renderExecutionMetadata({
  element,
  data,
} = {}) {
  const dataList = document.createElement('dl');
  dataList.classList = 'keen-dataviz-execution-meta';

  if (Object.keys(data).length) {
    Object.keys(data).forEach((item) => {
      const dt = document.createElement('dt');
      dt.innerText = item.replace(/_/g, ' ');
      dt.addEventListener('click', e => handleCopyToClipboard(e));

      const dd = document.createElement('dd');
      dd.innerText = data[item];
      dd.addEventListener('click', e => handleCopyToClipboard(e));

      dataList.append(dt);
      dataList.append(dd);
    });
  } else {
    dataList.innerText = 'No execution metadata available';
  }

  element.append(dataList);
}
