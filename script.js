const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

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

data.forEach(createBox);

// function to createBox for each of the data on the DOM
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info" >${text}</p>
  `;

  // box to speech - addEventListener on each box
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // add active class
    box.classList.add("active");
    setTimeout(() => {
      box.classList.remove("active");
    }, 800);
  });

  main.appendChild(box);
}

// Init speech synthesis
const message = new SpeechSynthesisUtterance();

// store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

// set text
function setTextMessage(text) {
  message.text = text;
}

// speak the text
function speakText() {
  speechSynthesis.speak(message);
}

// function to change the speaker
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// voices change - Event Listener
speechSynthesis.addEventListener("voiceschanged", getVoices);

// toggle text box - event listener on toggleBtn
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// close text box - event listener on closeBtn
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// change the speaker
voicesSelect.addEventListener("change", setVoice);

// read text in the text box
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
