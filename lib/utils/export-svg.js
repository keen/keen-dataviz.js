import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export default function exportImage(node, quality, bgcolor = '#fff') {
  if (quality) {
    if (quality < 0 || quality > 1) throw Error('Please provide image quality between 0 and 1');
    domtoimage.toBlob(node, { quality, bgcolor })
      .then((blob) => {
        saveAs(blob, 'chart.jpeg');
      });
  }

  if (!quality) {
    domtoimage.toBlob(node)
      .then((blob) => {
        saveAs(blob, 'chart.png');
      });
  }
}
