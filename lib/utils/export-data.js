function generateCsvContent(data) {
  let csvContent = '';

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
  return `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
}

export default function exportData(obj) {
  const { type, data } = obj;
  const supportedFormats = ['json', 'csv'];
  const format = type.toLowerCase();
  if (!supportedFormats.includes(type)) {
    throw new Error('This type is not supported');
  }

  const fileName = 'chart';
  let fileFormat = supportedFormats[0];
  let content = '';

  if (format === 'json') {
    content = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(data))}`;
  }

  if (format === 'csv') {
    content = generateCsvContent(data);
    fileFormat = format;
  }

  const htmlElement = document.createElement('a');
  htmlElement.setAttribute('href', content);
  htmlElement.setAttribute('download', `${fileName}.${fileFormat}`);
  document.body.appendChild(htmlElement);
  htmlElement.click();
  document.body.removeChild(htmlElement);
}
