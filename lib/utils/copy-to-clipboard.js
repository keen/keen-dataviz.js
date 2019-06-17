function stickTooltip(event, tooltip) {
  tooltip.style.opacity = 0;
  tooltip.style.top = `${event.pageY}px`;
  tooltip.style.left = `${event.pageX + 10}px`;
}

export default function copyToClipboard(value, event) {
  const placeholder = document.createElement('input');
  placeholder.value = value;
  document.body.appendChild(placeholder);
  placeholder.select();
  document.execCommand('copy');
  document.body.removeChild(placeholder);

  if (event) {
    const notification = document.createElement('div');
    notification.style.padding = '5px 10px';
    notification.style.backgroundColor = '#ffffff';
    notification.style.fontSize = '12px';
    notification.style.position = 'absolute';
    notification.style.top = `${event.pageY}px`;
    notification.style.left = `${event.pageX + 10}px`;
    notification.style.zIndex = '999';
    notification.style.opacity = 1;
    notification.style.transition = 'opacity 1s ease';
    notification.innerText = 'copied!';

    document.body.appendChild(notification);
    document.addEventListener('mousemove', e => stickTooltip(e, notification));

    setTimeout(() => {
      notification.style.opacity = 1;
      document.body.removeChild(notification);
    }, 1000);
  }
}
