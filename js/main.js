/**
 * =====================================================
 *  FTO - FÚTBOL TENIS OTOÑAL
 *  JS PRINCIPAL — Renderiza tablas y efectos en index
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  renderProximosPartidos();
  renderResultados();
  initParticles();
  initCounters();
  initScrollEffects();
});

// ─── PRÓXIMOS PARTIDOS ────────────────────────────────
function renderProximosPartidos() {
  const container = document.getElementById("proximos-tbody");
  if (!container) return;

  if (!PROXIMOS_PARTIDOS || PROXIMOS_PARTIDOS.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="empty-row">No hay partidos programados aún</td></tr>`;
    return;
  }

  container.innerHTML = PROXIMOS_PARTIDOS.map((p) => {
    const fecha = formatFecha(p.fecha);
    const esDestacado = p.destacado ? "row-destacado" : "";
    const esGranFinal = p.ronda === "GRAN FINAL";

    return `
      <tr class="${esDestacado}">
        <td class="td-fecha">
          <div class="fecha-box">
            <span class="fecha-dia">${getDia(p.fecha)}</span>
            <span class="fecha-mes">${getMes(p.fecha)}</span>
          </div>
          <span class="hora-badge">${p.hora}</span>
        </td>
        <td class="td-jugadores">
          <div class="vs-container">
            <span class="jugador-nombre">${p.jugador1}</span>
            <span class="vs-badge ${esGranFinal ? "vs-final" : ""}">⚽ VS ⚽</span>
            <span class="jugador-nombre">${p.jugador2}</span>
          </div>
        </td>
        <td class="td-ronda">
          <span class="ronda-tag ${esGranFinal ? "tag-final" : ""}">${p.ronda}</span>
        </td>
        <td class="td-estado">
          <span class="estado-badge estado-pendiente">Programado</span>
        </td>
      </tr>
    `;
  }).join("");
}

// ─── RESULTADOS ───────────────────────────────────────
function renderResultados() {
  const container = document.getElementById("resultados-tbody");
  if (!container) return;

  if (!RESULTADOS || RESULTADOS.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="empty-row">Sin resultados aún</td></tr>`;
    return;
  }

  // Mostrar más recientes primero
  const ordenados = [...RESULTADOS].reverse();

  container.innerHTML = ordenados.map((r) => {
    const [s1, s2] = r.sets.split("-").map(Number);
    const j1Gano = r.ganador === r.jugador1;

    return `
      <tr>
        <td class="td-fecha">
          <div class="fecha-box">
            <span class="fecha-dia">${getDia(r.fecha)}</span>
            <span class="fecha-mes">${getMes(r.fecha)}</span>
          </div>
        </td>
        <td class="td-resultado-jugadores">
          <div class="resultado-row">
            <span class="jugador-nombre ${j1Gano ? "jugador-ganador" : "jugador-perdedor"}">
              ${j1Gano ? "🏆" : ""} ${r.jugador1}
            </span>
            <div class="marcador-box">
              <span class="marcador-num ${j1Gano ? "num-ganador" : ""}">${s1}</span>
              <span class="marcador-sep">—</span>
              <span class="marcador-num ${!j1Gano ? "num-ganador" : ""}">${s2}</span>
            </div>
            <span class="jugador-nombre ${!j1Gano ? "jugador-ganador" : "jugador-perdedor"}">
              ${!j1Gano ? "🏆" : ""} ${r.jugador2}
            </span>
          </div>
        </td>
        <td class="td-ronda">
          <span class="ronda-tag">${r.ronda}</span>
        </td>
        <td class="td-duracion">
          <span class="duracion-icon">⏱</span> ${r.duracion || "—"}
        </td>
        <td class="td-estado">
          <span class="estado-badge estado-finalizado">Finalizado</span>
        </td>
      </tr>
    `;
  }).join("");
}

// ─── UTILIDADES DE FECHA ──────────────────────────────
function formatFecha(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function getDia(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.getDate().toString().padStart(2, "0");
}

function getMes(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();
}

// ─── PARTÍCULAS DE FONDO ──────────────────────────────
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.color = Math.random() > 0.5
      ? `rgba(255, 107, 0, ${Math.random() * 0.5 + 0.1})`
      : `rgba(57, 255, 20, ${Math.random() * 0.4 + 0.1})`;
  }

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > W) this.speedX *= -1;
    if (this.y < 0 || this.y > H) this.speedY *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
  };

  function init() {
    particles = [];
    const count = Math.min(80, Math.floor((W * H) / 12000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,107,0,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }

  resize();
  init();
  animate();
  window.addEventListener("resize", () => { resize(); init(); });
}

// ─── CONTADORES ANIMADOS ──────────────────────────────
function initCounters() {
  // Total jugadores desde data.js
  const totalEl = document.getElementById("stat-jugadores");
  if (totalEl && typeof TORNEO !== "undefined") {
    animateCount(totalEl, TORNEO.totalJugadores, 1200);
  }
  const partidosEl = document.getElementById("stat-partidos");
  if (partidosEl && typeof RESULTADOS !== "undefined") {
    animateCount(partidosEl, RESULTADOS.length, 1000);
  }
  const proximosEl = document.getElementById("stat-proximos");
  if (proximosEl && typeof PROXIMOS_PARTIDOS !== "undefined") {
    animateCount(proximosEl, PROXIMOS_PARTIDOS.length, 900);
  }
}

function animateCount(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}

// ─── EFECTOS DE SCROLL ────────────────────────────────
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Navbar scroll effect
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      nav?.classList.add("scrolled");
    } else {
      nav?.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const burger = document.getElementById("burger-btn");
  const navMenu = document.getElementById("nav-menu");
  burger?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
    burger.classList.toggle("active");
  });
}