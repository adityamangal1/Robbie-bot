const texts = document.querySelector(".texts");

// Recognition initializer

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

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
      p.innerText = "Bot: Hello Master! How can I help you? 👋";
      texts.appendChild(p);
    }

    // meaning of word funciton
    if (text.includes("meaning of ")) {
      word = text.slice(11);
      // console.log(word);
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
      // fetch("https://twittezer.herokuapp.com/random")
      fetch("https://geek-jokes.sameerkumar.website/api?format=json")
        
      .then((response) => {
        return response.json();
      })
      
      .then((response) => {
        p = document.createElement("p");
        p.classList.add("answer");
        console.log(response)
        p.innerText = response.joke + "😂😂";
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

// Pre loader for App while it loads

var loader = document.querySelector(".loader");

window.addEventListener("load", hideit);

function hideit() {
  setTimeout(() => {
    loader.classList.add("dissapear");
  }, 450);
}
