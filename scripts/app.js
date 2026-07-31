// ===============================
// СОЮЗNET • APP.JS
// Cinematic Sovietwave System
// ===============================

// -------------------------------
// GLOBAL
// -------------------------------

const body = document.body;
const cards = document.querySelectorAll(".card");
const ads = document.querySelectorAll(".ad");
const republics = document.querySelectorAll(".republic");

let audioEnabled = false;

// -------------------------------
// CINEMATIC INTRO
// -------------------------------

window.addEventListener("load", () => {
  createBootScreen();

  setTimeout(() => {
    document.querySelector(".boot-screen").classList.add("boot-hide");

    setTimeout(() => {
      document.querySelector(".boot-screen").remove();

      enablePageAnimations();
      startAmbientEffects();
    }, 1800);

  }, 3800);
});

function createBootScreen() {

  const boot = document.createElement("div");

  boot.className = "boot-screen";

  boot.innerHTML = `
    <div class="boot-overlay"></div>

    <div class="boot-content">

      <div class="boot-symbol">☭</div>

      <h1>СОЮЗNET</h1>

      <p id="bootText">
        Подключение к государственному архиву...
      </p>

      <div class="boot-progress">
        <div class="boot-progress-bar"></div>
      </div>

      <div class="boot-lines">
        <span>SYS:// USSR_MAINFRAME</span>
        <span>STATUS:// CONNECTED</span>
        <span>ACCESS:// GRANTED</span>
      </div>

    </div>
  `;

  document.body.appendChild(boot);
}

// -------------------------------
// PAGE ANIMATIONS
// -------------------------------

function enablePageAnimations() {

  const revealElements = document.querySelectorAll(
    ".section, .card, .ad, .map, .info-panel"
  );

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if(entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(el => {
    el.classList.add("hidden-reveal");
    observer.observe(el);
  });
}

// -------------------------------
// FLOATING LIGHTS
// -------------------------------

function startAmbientEffects() {

  setInterval(() => {

    const light = document.createElement("div");

    light.className = "ambient-light";

    light.style.left = Math.random() * 100 + "vw";
    light.style.top = Math.random() * 100 + "vh";

    light.style.width =
      120 + Math.random() * 200 + "px";

    light.style.height =
      light.style.width;

    document.body.appendChild(light);

    setTimeout(() => {
      light.remove();
    }, 9000);

  }, 1800);
}

// -------------------------------
// CARD PARALLAX
// -------------------------------

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      scale(1.02)
    `;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "";

  });

});

// -------------------------------
// ADS GLITCH EFFECT
// -------------------------------

ads.forEach(ad => {

  ad.addEventListener("mouseenter", () => {

    ad.classList.add("glitching");

    setTimeout(() => {
      ad.classList.remove("glitching");
    }, 700);

  });

});

// -------------------------------
// REPUBLIC INTERACTION
// -------------------------------

const infoPanel = document.getElementById("infoPanel");

republics.forEach(rep => {

  rep.addEventListener("mouseenter", () => {

    updateRepublicPanel(rep);

  });

  rep.addEventListener("click", () => {

    cinematicPulse(rep);

  });

});

function updateRepublicPanel(rep) {

  const republicName = rep.textContent;
  const republicInfo = rep.dataset.info;

  infoPanel.innerHTML = `
    <div class="panel-top-line"></div>

    <div class="panel-symbol">
      ☭
    </div>

    <h3>${republicName}</h3>

    <p>${republicInfo}</p>

    <div class="panel-stats">

      <div class="stat">
        <span class="stat-label">STATUS</span>
        <span class="stat-value">ACTIVE</span>
      </div>

      <div class="stat">
        <span class="stat-label">LOYALTY</span>
        <span class="stat-value">98%</span>
      </div>

      <div class="stat">
        <span class="stat-label">INDUSTRY</span>
        <span class="stat-value">HIGH</span>
      </div>

    </div>

    <div class="panel-image"></div>
  `;
}

// -------------------------------
// PULSE EFFECT
// -------------------------------

function cinematicPulse(element) {

  const pulse = document.createElement("div");

  pulse.className = "pulse-effect";

  const rect = element.getBoundingClientRect();

  pulse.style.left = rect.left + rect.width / 2 + "px";
  pulse.style.top = rect.top + rect.height / 2 + "px";

  document.body.appendChild(pulse);

  setTimeout(() => {
    pulse.remove();
  }, 1200);
}

// -------------------------------
// TERMINAL SYSTEM
// -------------------------------

const terminalInput =
  document.getElementById("terminalInput");

const terminalOutput =
  document.getElementById("terminalOutput");

const terminalCommands = {

  help: `
AVAILABLE COMMANDS:

help
ussr
sputnik
gagarin
glory
radio
clear
moscow
system
`,

  ussr: `
СССР:
Union of Soviet Socialist Republics.
1922 - 1991.
`,

  sputnik: `
SPUTNIK-1:
First artificial satellite launched in 1957.
`,

  gagarin: `
ЮРИЙ ГАГАРИН:
First human in space.
1961.
`,

  glory: `
СЛАВА СОЮЗУ ☭
`,

  radio: `
STATE RADIO ONLINE...
SIGNAL DETECTED...
`,

  moscow: `
МОСКВА:
Capital of the Soviet Union.
`,

  system: `
SOYUZNET v2.1
STATE ARCHIVE CONNECTED
ALL SYSTEMS OPERATIONAL
`
};

terminalInput.addEventListener("keydown", (e) => {

  if(e.key !== "Enter") return;

  const value =
    terminalInput.value.toLowerCase().trim();

  addTerminalLine(`> ${value}`);

  if(value === "clear") {

    terminalOutput.innerHTML = "";
    terminalInput.value = "";
    return;

  }

  if(terminalCommands[value]) {

    typeTerminalText(
      terminalCommands[value]
    );

  } else {

    typeTerminalText(
      "COMMAND NOT FOUND."
    );

  }

  terminalInput.value = "";

});

function addTerminalLine(text) {

  terminalOutput.innerHTML += `
    <div class="terminal-line">
      ${text}
    </div>
  `;

  terminalOutput.scrollTop =
    terminalOutput.scrollHeight;
}

function typeTerminalText(text) {

  const line =
    document.createElement("div");

  line.className = "terminal-line";

  terminalOutput.appendChild(line);

  let i = 0;

  const interval = setInterval(() => {

    line.innerHTML += text[i];

    i++;

    terminalOutput.scrollTop =
      terminalOutput.scrollHeight;

    if(i >= text.length) {
      clearInterval(interval);
    }

  }, 12);
}

// -------------------------------
// NAVBAR GLOW
// -------------------------------

window.addEventListener("scroll", () => {

  const header =
    document.querySelector("header");

  if(window.scrollY > 50) {

    header.style.background =
      "rgba(0,0,0,0.82)";

    header.style.boxShadow =
      "0 10px 40px rgba(0,0,0,0.45)";

  } else {

    header.style.background =
      "rgba(0,0,0,0.5)";

    header.style.boxShadow =
      "none";

  }

});

// -------------------------------
// RANDOM PROPAGANDA POPUPS
// -------------------------------

const propagandaMessages = [

  "GLORY TO THE COSMOS",
  "THE STATE TRUSTS YOU",
  "INDUSTRY IS STRENGTH",
  "JOIN THE FUTURE",
  "UNITY • PROGRESS • POWER"

];

setInterval(() => {

  createPropagandaPopup();

}, 14000);

function createPropagandaPopup() {

  const popup =
    document.createElement("div");

  popup.className =
    "propaganda-popup";

  popup.innerHTML = `
    ☭ ${propagandaMessages[
      Math.floor(
        Math.random() *
        propagandaMessages.length
      )
    ]}
  `;

  popup.style.left =
    10 + Math.random() * 70 + "vw";

  popup.style.top =
    10 + Math.random() * 70 + "vh";

  document.body.appendChild(popup);

  setTimeout(() => {

    popup.classList.add("popup-hide");

    setTimeout(() => {
      popup.remove();
    }, 1000);

  }, 5000);
}

// -------------------------------
// SMOOTH SECTION TRANSITIONS
// -------------------------------

document.querySelectorAll("a[href^='#']")
.forEach(anchor => {

  anchor.addEventListener("click", function(e) {

    e.preventDefault();

    const target =
      document.querySelector(
        this.getAttribute("href")
      );

    if(target) {

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      cinematicPulse(target);

    }

  });

});

// -------------------------------
// MOUSE LIGHT FOLLOWER
// -------------------------------

const cursorLight =
  document.createElement("div");

cursorLight.className =
  "cursor-light";

document.body.appendChild(cursorLight);

document.addEventListener("mousemove", (e) => {

  cursorLight.style.left =
    e.clientX + "px";

  cursorLight.style.top =
    e.clientY + "px";

});

// -------------------------------
// SECRET EASTER EGG
// -------------------------------

let secretCode = [];

document.addEventListener("keydown", (e) => {

  secretCode.push(e.key.toLowerCase());

  if(secretCode.length > 5) {
    secretCode.shift();
  }

  if(secretCode.join("") === "ussr") {

    activateRedMode();

  }

});

function activateRedMode() {

  document.body.classList.add("red-mode");

  createPropagandaPopup();

  setTimeout(() => {

    document.body.classList.remove("red-mode");

  }, 7000);
}

// -------------------------------
// END
// -------------------------------

console.log(`
☭ СОЮЗNET INITIALIZED
STATE SYSTEM ONLINE
`);