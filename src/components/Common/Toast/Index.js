import './index.less';

export default (text, time, options) => {
  try {
    document.body.removeChild(document.getElementsByClassName('toast')[0]);
  } catch (error) {
    console.log('没有toast');
  }
  let delayed = time || 3000;
  let toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = text;
  toast.style['fontSize'] = '15px';
  toast.style.animationDuration = delayed / 1000 + 's';
  for (const prop in options) {
    if (options.hasOwnProperty(prop)) {
      toast.style[prop] = options[prop];
    }
  }
  toast.style['z-index'] = 9999;
  document.body.appendChild(toast);
  setTimeout(() => {
    try {
      document.body.removeChild(document.getElementsByClassName('toast')[0]);
    } catch (error) {
      
    }
  }, delayed);
}