// const data = {form: true};
// window.postMessage(data, '*');

window.addEventListener('message', (event) => {
  const data = event.data;

  if (data.form === true) {
    document.querySelector('body').style.display = 'flex';
  } else {
    document.querySelector('body').style.display = 'none';
  }
});
