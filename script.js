// Wrap every letter in a span
var textWrapper = document.querySelector(".ml11 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml11 .line",
    scaleY: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
  })
  .add({
    targets: ".ml11 .line",
    translateX: [
      0,
      document.querySelector(".ml11 .letters").getBoundingClientRect().width +
        10,
    ],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100,
  })
  .add({
    targets: ".ml11 .letter",
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: "-=775",
    delay: (el, i) => 34 * (i + 1),
  })
  .add({
    targets: ".ml11",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

const texts = document.querySelector(".texts");

// Recognition initializer

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");

recognition.addEventListener("result", (e) => {
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.innerText = "User Command: " + text;
  p.classList.add("user");
  texts.appendChild(p);
  console.log(text);

  if (e.results[0].isFinal) {
    if (
      text.includes("hai") ||
      text.includes("hey") ||
      text.includes("hello")
    ) {
      p = document.createElement("p");
      p.classList.add("answer");
      p.innerText = "Bot: Hello Sir! How can I help you? 👋";
      texts.appendChild(p);
    }
    if (text.includes("meaning of ")) {
      word = text.slice(11);
      console.log(word);
      // window.open("https://youtube.com/" +str)
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=7e7436ae-9a1a-48e5-a02d-6bfcab41cc8f`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log("ok" + response[0].shortdef[0]);
          p = document.createElement("p");
          p.classList.add("answer");
          p.innerText = "Meaning: " + response[0].shortdef[0];
          texts.appendChild(p);
        })
        .catch((err) => {
          console.log(err);
          definition.classList.add("error");
          definition.textContent = "No Definition Available";
        });

    }
    if (text.includes("open YouTube")) {
      window.open('https://youtube.com')
    }
    if (text.includes("discord")) {
      window.open('https://discord.com/channels/@mes')
    }
  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();
