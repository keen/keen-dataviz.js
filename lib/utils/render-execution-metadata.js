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
      const dd = document.createElement('dd');
      dd.innerText = data[item];

      dataList.append(dt);
      dataList.append(dd);
    });
  } else {
    dataList.innerText = 'No execution metadata available';
  }

  element.append(dataList);
}
