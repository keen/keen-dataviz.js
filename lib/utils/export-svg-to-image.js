import { saveAs } from 'file-saver';
import { toUnicode } from 'punycode';
import domtoimage from 'dom-to-image';
// import htmlToImage from 'html-to-image';
// var htmlToImage = require('html-to-image');

function appendCSS(cssText, element) {
  console.log(element);
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.innerHTML = cssText;
  const refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore(styleElement, refNode);
}

function getCSSStyles(parentElement) {
  const selectorTextArr = [];

  // Add Parent element Id and Classes to the list
  if (parentElement.id) selectorTextArr.push(`#${parentElement.id}`);
  // for (let c = 0; c < parentElement.classList.length; c += 1) {
  //   if (!selectorTextArr.includes(`.${parentElement.classList[c]}`)) {
  //     selectorTextArr.push(`.${parentElement.classList[c]}`);
  //   }
  // }

  parentElement.classList.forEach((c) => {
    if (!selectorTextArr.includes(`.${c}`)) {
      selectorTextArr.push(`.${c}`);
    }
  });

  // Add Children element Ids and Classes to the list
  const nodes = parentElement.getElementsByTagName('*');
  // for (let i = 0; i < nodes.length; i += 1) {
  //   const { id } = nodes[i];
  //   if (id && !selectorTextArr.includes(`#${id}`)) {
  //     selectorTextArr.push(`#${id}`);
  //   }

  //   const classes = nodes[i].classList;
  //   for (let c = 0; c < classes.length; c += 1) {
  //     if (!selectorTextArr.includes(`.${classes[c]}`)) {
  //       selectorTextArr.push(`.${classes[c]}`);
  //     }
  //   }
  // }

  [...nodes].forEach((node) => {
    const { id } = node;
    if (id && !selectorTextArr.includes(`#${id}`)) {
      selectorTextArr.push(`#${id}`);
    }

    const classes = node.classList;
    classes.forEach((c) => {
      if (!selectorTextArr.includes(`.${c}`)) {
        selectorTextArr.push(`.${c}`);
      }
    });
  });

  // console.log(selectorTextArr);

  // Extract CSS Rules
  let extractedCSSText = '';

  [...document.styleSheets].forEach((sheet) => {
    const { cssRules } = sheet;
    [...cssRules].forEach((rule) => {
      selectorTextArr.forEach((item) => {
        if (rule.selectorText && rule.selectorText.includes(item)) {
          extractedCSSText += rule.cssText;
        }
      });
      // if (selectorTextArr.includes(rule.selectorText)) {
      //   console.log(rule.selectorText);
      //   extractedCSSText += rule.cssText;
      // }
    });
  });


  // for (let i = 0; i < document.styleSheets.length; i += 1) {
  //   const s = document.styleSheets[i];
  //   try {
  //     if (!s.cssRules) continue;
  //   } catch (e) {
  //     if (e.name !== 'SecurityError') throw e; // for Firefox
  //     continue;
  //   }

  //   const { cssRules } = s;
  //   for (let r = 0; r < cssRules.length; r++) {
  //     if (selectorTextArr.includes(cssRules[r].selectorText)) {
  //       extractedCSSText += cssRules[r].cssText;
  //     }
  //   }
  // }
  // console.log(extractedCSSText);
  return extractedCSSText;
}

export function getSVGString(node) {
  const parentNode = document.createElement('div');
  const clone = node.closest('.keen-dataviz').cloneNode(true);
  parentNode.id = 'screenshot';
  // parentNode.appendChild(clone);
  const styles = getCSSStyles(node.closest('.keen-dataviz'));
  appendCSS(styles, parentNode);
  // document.body.appendChild(parentNode);
  // const temp = document.getElementById('screenshot');
  // htmlToImage.toPng(temp)
  //   .then((data) => {
  //     const img = new Image();
  //     img.src = data;
  //     document.body.appendChild(img);
  //   })
  //   .catch(error => console.error('ooops, something went wrong!', error));


  domtoimage.toPng(node.closest('.keen-dataviz'))
    .then((dataUrl) => {
      console.log('**** DOMTOIMAGE ****', dataUrl);
      const img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error);
    });

  // node.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
  // const cssStyleText = getCSSStyles(node.closest('.keen-dataviz'));
  // appendCSS(cssStyleText, node);
  // console.log(node);
  // console.log(parentNode);
  const serializer = new XMLSerializer();
  // let svgString = serializer.serializeToString(node);
  let svgString = serializer.serializeToString(parentNode);
  // svgString = svgString.replace('xmlns="http://www.w3.org/1999/xhtml"', '');
  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
  // console.log(btoa(unescape(encodeURIComponent(svgString))));
  return svgString;
}

export function svgString2Image(svgString, width, height, format = 'png', callback) {
  const imgSrc = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString)))}`; // Convert SVG string to data URL
  // console.log(imgSrc);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  const image = new Image();
  document.body.append(image);
  image.onload = () => {
    // console.log('onload@@@');
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    canvas.toBlob((blob) => {
      const filesize = `${Math.round(blob.length / 1024)} KB`;
      // console.log(blob.size);
      if (callback) {
        console.log('callback should be run next');
        // callback(blob, filesize);
      }
    });
  };
  image.src = imgSrc;
  // document.body.append(image);
}


// export function svgString2Image(svgString, width, height, format = 'png', callback) {
//   // console.log(svgString);
//   // const canvas = document.createElement('canvas');
//   // const context = canvas.getContext('2d');
//   // canvas.width = width;
//   // canvas.height = height;
//   let data = `<svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height}>
//   <foreignObject width="100%" height="100%">${svgString}</foreignObject>
//   </svg>`;

//   data = encodeURIComponent(data);
//   // const image = document.createElement('img');
//   // console.log('********* img created');
//   // image.addEventListener('load', onTempImageLoad);
//   // image.src = `data:image/svg+xml,${data}`;
//   // console.log('******* data', image);
//   // const targetImage = document.createElement('img');
//   // document.body.appendChild(targetImage);

//   // function onTempImageLoad(e) {
//   //   context.drawImage(e.target, 0, 0);
//   //   targetImage.src = canvas.toDataURL();
//   // }
// const {body} = document

// const canvas = document.createElement('canvas')
// const ctx = canvas.getContext('2d')
// canvas.width = canvas.height = 100

// const tempImg = document.createElement('img')
// tempImg.addEventListener('load', onTempImageLoad)
// // tempImg.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>em{color:red;}</style><em>I</em> lick <span>cheese</span></div></foreignObject></svg>')
// tempImg.src = `data:image/svg+xml, ${data}`;

// const targetImg = document.createElement('img')
// body.appendChild(targetImg)

// function onTempImageLoad(e){
//   ctx.drawImage(e.target, 0, 0)
//   targetImg.src = canvas.toDataURL()
// }

//   // image.addEventListener('load', (e) => {
//   //   context.drawImage(e.target, 0, 0);
//   //   targetImage.src = canvas.toDataURL();
//   // });

//   // image.onload = () => {
//   //   context.drawImage(image, 0, 0);

//   //   canvas.toBlob((blob) => {
//   //     console.log('blob!!');
//   //     const newImage = document.createElement('img');
//   //     const url = URL.createObjectURL(blob);

//   //     newImage.onload = () => URL.revokeObjectURL(url);
//   //     newImage.src = url;
//   //     document.body.appendChild(newImage);
//   //   });
//   // };
//   // image.src = `data:image/svg+xml,${data}`;
// }

export function save(dataBlob, filesize) {
  console.log(dataBlob, filesize);
  // saveAs(dataBlob, 'D3 vis exported to PNG.png'); // FileSaver.js function
  // saveAs(dataBlob, 'D3 vis exported to JPG.jpg'); // FileSaver.js function
};
