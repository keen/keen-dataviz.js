import exportImage from './export-svg';
import exportData from './export-data';

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
    exportData({ type: format, data });
  }

  if (format === 'csv') {
    exportData({ type: format, data });
  }
}
