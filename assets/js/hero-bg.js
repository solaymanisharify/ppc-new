const txtsLen = 7;
let index = 0;

const textInTimer = 3000;

const gradients = [
//   "linear-gradient(45deg, #6502D5, #5C10D9, #0B83FE)",
//   "linear-gradient(45deg, #5808FB, #5C10D9, #AB0BFE)",
  "linear-gradient(45deg, #A521E9, #FF9147)",
  "linear-gradient(45deg, #F2934E, #AE2CD7)",
//   "linear-gradient(45deg, #AA03DA, #1A31DB)",
//   "linear-gradient(45deg, #0118FE, #039AFE)",
//   "linear-gradient(45deg, #028EDE, #2DE592)"
];

const myElement = document.getElementById("back");

function animateText() {
  myElement.style.background = gradients[index];

  index = (index + 1) % txtsLen;

  setTimeout(animateText, textInTimer);
}

// start animation
animateText()