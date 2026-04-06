const messages = [
  "Me haces feliz de una forma que no sabia que existia.",
  "Eres mi pensamiento favorito cada dia.",
  "Contigo todo se siente mas bonito.",
  "No necesito nada mas si te tengo a ti.",
  "Eres mi casualidad favorita.",
  "Gracias por ser tu, asi de perfecta para mi.",
  "Si sonrio sin razon, probablemente es por ti.",
  "Eres mi lugar seguro en este mundo."
];

const bg = document.getElementById("bg");
const music = document.getElementById("music");
const envelope = document.getElementById("envelope");
const flap = document.getElementById("flap");
const letter = document.getElementById("letter");
const messageElement = document.getElementById("message");
const snoopy = document.getElementById("snoopy");
const kuromi = document.getElementById("kuromi");

let opened = false;
let lastMessage = "";
let typingToken = 0;

function getRandomMessage() {
  if (messages.length === 1) {
    return messages[0];
  }

  let nextMessage = messages[Math.floor(Math.random() * messages.length)];

  while (nextMessage === lastMessage) {
    nextMessage = messages[Math.floor(Math.random() * messages.length)];
  }

  lastMessage = nextMessage;
  return nextMessage;
}

function typeWriter(text, element, speed = 40) {
  const currentToken = ++typingToken;
  let i = 0;

  function write() {
    if (currentToken !== typingToken) {
      return;
    }

    if (i < text.length) {
      element.textContent += text.charAt(i);
      i += 1;
      setTimeout(write, speed);
    }
  }

  write();
}

function createFloating() {
  const symbols = ["\u{1F497}", "\u{1F496}", "\u2728", "\u2601\uFE0F"];

  setInterval(() => {
    const el = document.createElement("div");
    const isSoft = Math.random() > 0.55;

    el.className = isSoft ? "floating soft" : "floating";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.fontSize = 16 + Math.random() * 18 + "px";
    el.style.animationDuration = 5 + Math.random() * 3 + "s";

    bg.appendChild(el);

    setTimeout(() => el.remove(), 8000);
  }, 650);
}

function explodeHearts() {
  for (let i = 0; i < 25; i += 1) {
    const heart = document.createElement("div");
    heart.className = "click-heart";
    heart.textContent = i % 4 === 0 ? "\u2728" : "\u{1F49E}";
    heart.style.left = window.innerWidth / 2 + (Math.random() * 60 - 30) + "px";
    heart.style.top = window.innerHeight / 2 + (Math.random() * 40 - 20) + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
  }
}

function playMusic() {
  if (music.paused) {
    music.play().catch(() => {
      opened = false;
    });
  }
}

function showKuromi() {
  kuromi.classList.remove("hidden");
  kuromi.classList.add("show");
}

function openLetter() {
  messageElement.textContent = "";
  explodeHearts();
  playMusic();

  if (!opened) {
    opened = true;
    snoopy.classList.add("opened");
    envelope.classList.remove("hidden");
    envelope.classList.add("show");
    kuromi.addEventListener("error", () => kuromi.classList.add("hidden"), { once: true });
    kuromi.addEventListener("load", showKuromi, { once: true });

    if (kuromi.complete && kuromi.naturalWidth > 0) {
      showKuromi();
    }

    setTimeout(() => {
      flap.classList.add("open");
      letter.classList.add("open");
      typeWriter(getRandomMessage(), messageElement);
    }, 300);

    return;
  }

  typeWriter(getRandomMessage(), messageElement, 28);
}

createFloating();
