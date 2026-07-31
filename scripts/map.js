// ======================================
// СОЮЗNET • MAP.JS
// Cinematic Soviet Tactical Map System
// ======================================

// -------------------------------
// MAP CORE
// -------------------------------

const republicElements =
  document.querySelectorAll(".republic");

const mapContainer =
  document.querySelector(".map");

const infoPanel =
  document.getElementById("infoPanel");

// -------------------------------
// REPUBLIC DATABASE
// -------------------------------

const republicDatabase = {

  "Россия": {
    title: "Российская СФСР",
    capital: "Москва",
    population: "147M",
    industry: "EXTREME",
    loyalty: "99%",
    description:
      "Centro político, espacial e industrial de la Unión Soviética. Responsable de gran parte de la infraestructura tecnológica y militar del estado.",
    color: "#c1121f",
    image:
      "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "COSMOS",
      "INDUSTRY",
      "MILITARY"
    ]
  },

  "Украина": {
    title: "Украинская ССР",
    capital: "Киев",
    population: "52M",
    industry: "HIGH",
    loyalty: "94%",
    description:
      "Potencia agrícola e industrial con enorme relevancia económica dentro del sistema soviético.",
    color: "#d62828",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "AGRICULTURE",
      "STEEL",
      "INDUSTRY"
    ]
  },

  "Казахстан": {
    title: "Казахская ССР",
    capital: "Алма-Ата",
    population: "16M",
    industry: "HIGH",
    loyalty: "91%",
    description:
      "Grandes estepas, minería y el legendario cosmódromo de Baikonur.",
    color: "#b5179e",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "COSMODROME",
      "MINING",
      "SCIENCE"
    ]
  },

  "Беларусь": {
    title: "Белорусская ССР",
    capital: "Минск",
    population: "10M",
    industry: "MEDIUM",
    loyalty: "96%",
    description:
      "Importante centro técnico e industrial rodeado de enormes bosques y complejos fabriles.",
    color: "#7209b7",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    tags: [
      "FORESTS",
      "FACTORIES",
      "TECH"
    ]
  }

};

// -------------------------------
// INTERACTION
// -------------------------------

republicElements.forEach(rep => {

  rep.addEventListener("mouseenter", () => {

    activateRepublic(rep);

  });

  rep.addEventListener("click", () => {

    activateRepublic(rep);
    createMapPulse(rep);

  });

});

// -------------------------------
// ACTIVATE REPUBLIC
// -------------------------------

function activateRepublic(rep) {

  const republicName =
    rep.textContent.trim();

  const data =
    republicDatabase[republicName];

  if(!data) return;

  republicElements.forEach(r => {
    r.classList.remove("active-republic");
  });

  rep.classList.add("active-republic");

  updateInfoPanel(data);
  createTacticalLines(rep, data.color);
  updateMapGlow(data.color);

}

// -------------------------------
// PANEL UPDATE
// -------------------------------

function updateInfoPanel(data) {

  infoPanel.innerHTML = `

    <div class="panel-classification">
      ГОСУДАРСТВЕННЫЙ АРХИВ
    </div>

    <div class="panel-banner"
      style="
        background-image:
        linear-gradient(
          to bottom,
          rgba(0,0,0,0.1),
          rgba(0,0,0,0.85)
        ),
        url('${data.image}');
      "
    >

      <div class="panel-banner-content">

        <div class="panel-icon">
          ☭
        </div>

        <h2>${data.title}</h2>

        <p>${data.capital}</p>

      </div>

    </div>

    <div class="panel-body">

      <div class="panel-stats-grid">

        <div class="panel-stat">
          <span>POPULATION</span>
          <strong>${data.population}</strong>
        </div>

        <div class="panel-stat">
          <span>INDUSTRY</span>
          <strong>${data.industry}</strong>
        </div>

        <div class="panel-stat">
          <span>LOYALTY</span>
          <strong>${data.loyalty}</strong>
        </div>

      </div>

      <div class="panel-description">
        ${data.description}
      </div>

      <div class="panel-tags">

        ${data.tags.map(tag => `
          <div class="panel-tag">
            ${tag}
          </div>
        `).join("")}

      </div>

    </div>

  `;

}

// -------------------------------
// TACTICAL LINES
// -------------------------------

function createTacticalLines(rep, color) {

  removeLines();

  const rect =
    rep.getBoundingClientRect();

  const mapRect =
    mapContainer.getBoundingClientRect();

  for(let i = 0; i < 5; i++) {

    const line =
      document.createElement("div");

    line.className =
      "tactical-line";

    line.style.background =
      `linear-gradient(
        90deg,
        transparent,
        ${color},
        transparent
      )`;

    line.style.top =
      rect.top - mapRect.top +
      rect.height / 2 + "px";

    line.style.left =
      rect.left - mapRect.left + "px";

    line.style.width =
      200 + Math.random() * 300 + "px";

    line.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    line.style.animationDelay =
      i * 0.1 + "s";

    mapContainer.appendChild(line);

  }

}

// -------------------------------
// REMOVE LINES
// -------------------------------

function removeLines() {

  document
    .querySelectorAll(".tactical-line")
    .forEach(line => line.remove());

}

// -------------------------------
// MAP GLOW
// -------------------------------

function updateMapGlow(color) {

  mapContainer.style.boxShadow = `
    inset 0 0 80px rgba(255,255,255,0.02),
    0 30px 80px rgba(0,0,0,0.45),
    0 0 100px ${color}33
  `;

}

// -------------------------------
// MAP PULSE
// -------------------------------

function createMapPulse(rep) {

  const pulse =
    document.createElement("div");

  pulse.className =
    "map-pulse";

  const rect =
    rep.getBoundingClientRect();

  const mapRect =
    mapContainer.getBoundingClientRect();

  pulse.style.left =
    rect.left - mapRect.left +
    rect.width / 2 + "px";

  pulse.style.top =
    rect.top - mapRect.top +
    rect.height / 2 + "px";

  mapContainer.appendChild(pulse);

  setTimeout(() => {
    pulse.remove();
  }, 1600);

}

// -------------------------------
// TACTICAL GRID ANIMATION
// -------------------------------

createRadarSweep();

function createRadarSweep() {

  const radar =
    document.createElement("div");

  radar.className =
    "radar-sweep";

  mapContainer.appendChild(radar);

}

// -------------------------------
// PARALLAX MAP
// -------------------------------

mapContainer.addEventListener(
  "mousemove",
  (e) => {

    const rect =
      mapContainer.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) /
      rect.width;

    const y =
      (e.clientY - rect.top) /
      rect.height;

    const moveX =
      (x - 0.5) * 18;

    const moveY =
      (y - 0.5) * 18;

    mapContainer.style.transform = `
      perspective(1600px)
      rotateX(${-moveY}deg)
      rotateY(${moveX}deg)
      translateY(-4px)
    `;

  }
);

mapContainer.addEventListener(
  "mouseleave",
  () => {

    mapContainer.style.transform =
      "";

  }
);

// -------------------------------
// RANDOM MAP EVENTS
// -------------------------------

const tacticalEvents = [

  "SATELLITE SIGNAL DETECTED",
  "INDUSTRIAL OUTPUT INCREASED",
  "RADAR ONLINE",
  "STATE NETWORK SYNCHRONIZED",
  "TACTICAL SYSTEM READY"

];

setInterval(() => {

  createMapEvent();

}, 12000);

function createMapEvent() {

  const event =
    document.createElement("div");

  event.className =
    "map-event";

  event.innerHTML =
    tacticalEvents[
      Math.floor(
        Math.random() *
        tacticalEvents.length
      )
    ];

  event.style.top =
    10 + Math.random() * 80 + "%";

  mapContainer.appendChild(event);

  setTimeout(() => {

    event.classList.add(
      "map-event-hide"
    );

    setTimeout(() => {
      event.remove();
    }, 1200);

  }, 4000);

}

// -------------------------------
// ZOOM SYSTEM
// -------------------------------

let currentScale = 1;

mapContainer.addEventListener(
  "wheel",
  (e) => {

    e.preventDefault();

    if(e.deltaY < 0) {
      currentScale += 0.08;
    } else {
      currentScale -= 0.08;
    }

    currentScale =
      Math.min(
        Math.max(currentScale, 1),
        1.8
      );

    mapContainer.style.scale =
      currentScale;

  },
  { passive: false }
);

// -------------------------------
// AUTO HIGHLIGHT LOOP
// -------------------------------

let currentRepublic = 0;

setInterval(() => {

  const republicArray =
    Array.from(republicElements);

  activateRepublic(
    republicArray[currentRepublic]
  );

  currentRepublic++;

  if(
    currentRepublic >=
    republicArray.length
  ) {
    currentRepublic = 0;
  }

}, 9000);

// -------------------------------
// SYSTEM READY
// -------------------------------

console.log(`
☭ TACTICAL MAP ONLINE
☭ STATE REGIONS SYNCHRONIZED
`);