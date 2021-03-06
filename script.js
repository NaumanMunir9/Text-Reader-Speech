const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");
const textBox = document.getElementById("text-box");

const data = [
  {
    image: "./img/thirsty.jpg",
    text: "I'm thirsty",
  },
  {
    image: "./img/hungry.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandma",
  },
];

data.forEach(boxElement);

function boxElement(item) {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info" >${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 500);
  });

  main.appendChild(box);
}

// init Web Speech API
const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

// Web Speech API
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

// Event Listener - SpeechSynthesis
toggleBtn.addEventListener("click", () => {
  textBox.classList.toggle("show");
});
closeBtn.addEventListener("click", () => {
  textBox.classList.remove("show");
});
speechSynthesis.addEventListener("voiceschanged", getVoices);
voicesSelect.addEventListener("change", (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
});
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
