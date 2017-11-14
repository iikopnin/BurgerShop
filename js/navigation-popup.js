var popup = document.querySelector('.navigation-popup');
var button = document.querySelector('.navigation-popup__button');
var body = document.querySelector('body');
var links = document.querySelectorAll('.navigation-popup__link');

console.log(body);

function onnOff() {
  popup.classList.toggle('navigation-popup--on');
  button.classList.toggle('navigation-popup__button-cross');
  body.classList.toggle('no-scroll');
}

button.addEventListener('click', onnOff); 

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', onnOff);
}
