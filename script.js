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

  if (e.results[0].isFinal) {

    // Greeting function
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

    // meaning of word funciton
    if (text.includes("meaning of ")) {
      word = text.slice(11);
      console.log(word);
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=7e7436ae-9a1a-48e5-a02d-6bfcab41cc8f`
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          p = document.createElement("p");
          p.classList.add("answer");
          p.innerText = "Meaning 📚: " + response[0].shortdef[0];
          texts.appendChild(p);
        })
        .catch((err) => {
          p = document.createElement("p");
          p.classList.add("answer");
          p.innerText = "Oops! No Definition Available";
          texts.appendChild(p);
        });

    }
    if (text.includes("open YouTube")) {
      window.open('https://youtube.com')
    }

    if (text.includes("discord")) {
      window.open('https://discord.com/channels/@mes')
    }

    // Random joke function
    if (text.includes("joke")) {
      fetch("https://official-joke-api.appspot.com/jokes/programming/random")
      .then((response) => {
        return response.json();
      })
      
      .then((response) => {
        p = document.createElement("p");
        p.classList.add("answer");
        p.innerText = response[0].setup;
        texts.appendChild(p);
        p = document.createElement("p");
        p.innerText = "Answer: " + response[0].punchline + "😂😂";
        texts.appendChild(p);
      })
      
      .catch((err) => {
        p = document.createElement("p");
        p.classList.add("answer");
        p.innerText = "Sorry No Jokes Available";
        texts.appendChild(p);
      });
    }
    const rndInt = Math.floor(Math.random() * 1642) + 1
    // Random thought function
    if (text.includes('thought')) {

      fetch("https://type.fit/api/quotes")
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response)
          p = document.createElement("p");
          p.classList.add("answer");
          p.innerText = "✨ Here's a positive thought: " + response[rndInt].text + "✨";
          texts.appendChild(p);
        })
        .catch((err) => {
          p = document.createElement("p");
          p.classList.add("answer");
          p.innerText = "Sorry No thoughts Available";
          texts.appendChild(p);
        });
    }

  }
});

recognition.addEventListener("end", () => {
  recognition.start();
});

recognition.start();

// Pre loader for website

var loader = document.querySelector(".loader");

window.addEventListener("load", hideit);

function hideit() {
  setTimeout(() => {
    loader.classList.add("dissapear");
  }, 450);
}

