import exportImage from './export-svg';

function generateCsvContent(data) {
  let csvContent = 'data:text/csv;charset=utf-8,';

  data.forEach((row, i) => {
    row.forEach((cell, j) => {
      csvContent += String(cell).replace(/,/g, '');
      if (row.length > j + 1) {
        csvContent += ',';
      }
    });
    if (data.length > i + 1) {
      csvContent += '\n';
    }
  });

  return csvContent;
}

export default function downloadResults(obj) {
  const { event, type, data } = obj;
  event.preventDefault();
  const supportedFormats = ['json', 'csv', 'jpg', 'jpeg', 'png'];
  const format = type.toLowerCase();
  if (!supportedFormats.includes(type)) {
    throw new Error('This type is not supported');
  }

  const fileName = 'chart';
  let fileFormat = '';
  let content = '';

  if (format === 'png') {
    exportImage({
      node: event.currentTarget.previousElementSibling,
    });
    return;
  }

  if (format === 'jpg' || format === 'jpeg') {
    exportImage({
      node: event.currentTarget.previousElementSibling,
      quality: 1,
      bgcolor: '#fff',
    });
    return;
  }

  if (format === 'json') {
    content = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(data))}`;
    fileFormat = format;
  }

  if (format === 'csv') {
    content = generateCsvContent(data);
  }

  const htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', content);
  htmlElement.setAttribute('download', `${fileName}.${fileFormat}`);
  document.body.appendChild(htmlElement);
  htmlElement.click();
  document.body.removeChild(htmlElement);
}
