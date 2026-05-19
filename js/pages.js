/**
 * =====================================================
 *  FTO — JS DE PÁGINAS SECUNDARIAS
 *  Jugadores · Reglamento · Nosotros
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initParticlesLight();
  initScrollEffects();

  // Renderiza según la página actual
  if (document.getElementById("jugadores-tbody")) renderTablaJugadores();
  if (document.getElementById("podio-container"))  renderPodio();
});

// ─── TABLA DE JUGADORES ───────────────────────────────
function renderTablaJugadores() {
  const tbody = document.getElementById("jugadores-tbody");
  if (!tbody || typeof JUGADORES === "undefined") return;

  // Ordenar por puntos desc, luego por partidos ganados
  const ordenados = [...JUGADORES].sort((a, b) =>
    b.puntos !== a.puntos ? b.puntos - a.puntos : b.pg - a.pg
  );

  tbody.innerHTML = ordenados.map((j, i) => {
    const rank = i + 1;
    const rankClass = rank <= 3 ? `rank-${rank}` : "";
    const inicial = j.nombre.charAt(0).toUpperCase();

    // Estado dinámico según puntos y posición
    let estadoLabel, estadoClass;
    if (rank === 1) {
      estadoLabel = "🥇 Líder";
      estadoClass = "estado-lider";
    } else if (j.pp === j.pj && j.pj > 0) {
      estadoLabel = "Eliminado";
      estadoClass = "estado-eliminado";
    } else {
      estadoLabel = "Activo";
      estadoClass = "estado-activo";
    }

    const pct = j.pj > 0 ? Math.round((j.pg / j.pj) * 100) : 0;

    return `
      <tr>
        <td><span class="rank-num ${rankClass}">${rank}</span></td>
        <td>
          <div class="jugador-cell">
            <div class="avatar-inicial">${inicial}</div>
            <div class="jugador-cell-info">
              <span class="jugador-nombre">${j.nombre}</span>
              <span class="jugador-cell-apodo">"${j.apodo}"</span>
            </div>
          </div>
        </td>
        <td style="text-align:center;font-family:var(--font-mono);font-size:0.85rem;color:var(--blanco-soft);">
          ${j.pj}
        </td>
        <td style="text-align:center;">
          <span class="stat-badge badge-win">${j.pg}</span>
        </td>
        <td style="text-align:center;">
          <span class="stat-badge badge-loss">${j.pp}</span>
        </td>
        <td style="text-align:center;">
          <span class="puntos-cell">${j.puntos}</span>
        </td>
        <td style="text-align:center;">
          <span class="player-estado ${estadoClass}">${estadoLabel}</span>
        </td>
      </tr>
    `;
  }).join("");
}

// ─── PODIO TOP 3 ──────────────────────────────────────
// Lógica:
//   1. Ordenamos todos los jugadores por puntos (desc), luego por PG como desempate
//   2. Tomamos los 3 primeros → top3[0]=1°, top3[1]=2°, top3[2]=3°
//   3. Los mostramos en orden visual PODIO: izquierda=2°, centro=1°, derecha=3°
//      (el campeón siempre va al centro y más alto)
function renderPodio() {
  const container = document.getElementById("podio-container");
  if (!container || typeof JUGADORES === "undefined") return;

  // Ordenar: mayor puntos primero; empate → mayor PG primero
  const top3 = [...JUGADORES]
    .sort((a, b) => b.puntos !== a.puntos ? b.puntos - a.puntos : b.pg - a.pg)
    .slice(0, 3);

  if (top3.length === 0) {
    container.innerHTML = `<p style="color:var(--gris-claro);font-family:var(--font-mono);font-size:0.75rem;letter-spacing:2px;grid-column:1/-1;text-align:center;">Sin datos aún</p>`;
    return;
  }

  // Orden visual del podio: [2°, 1°, 3°]
  // Si solo hay 1 o 2 jugadores, mostramos lo que hay centrado
  const visualOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]   // 2° | 1° | 3°
    : top3.length === 2
      ? [top3[1], top3[0]]          // 2° | 1°
      : [top3[0]];                  // solo 1°

  const posClases  = ["pos-2", "pos-1", "pos-3"];
  const rankLabels = ["2°",    "1°",    "3°"];

  // Si solo hay 1 jugador, arranca directo en pos-1
  const offset = top3.length >= 3 ? 0 : top3.length === 2 ? 0 : 1;

  container.innerHTML = visualOrder.map((j, i) => {
    const posIdx = top3.length >= 3 ? i : (top3.length === 2 ? i : 1);
    const inicial = j.nombre.charAt(0).toUpperCase();
    // Las tarjetas del podio se hacen visibles de inmediato (el observer ya corrió)
    return `
      <div class="podio-card ${posClases[posIdx]} visible" style="animation-delay:${i * 0.12}s">
        <div class="podio-rank">${rankLabels[posIdx]}</div>
        <div class="podio-avatar">${inicial}</div>
        <div class="podio-nombre">${j.nombre}</div>
        <div class="podio-apodo">"${j.apodo}"</div>
        <div class="podio-pts">${j.puntos} <span class="podio-pts-label">pts</span></div>
      </div>
    `;
  }).join("");
}

// ─── PARTÍCULAS LIGERAS (sin fondo pesado) ────────────
function initParticlesLight() {
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
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.color = Math.random() > 0.5
      ? `rgba(255, 107, 0, ${Math.random() * 0.35 + 0.08})`
      : `rgba(57, 255, 20, ${Math.random() * 0.25 + 0.06})`;
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
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.fill();
  };

  function init() {
    particles = [];
    const count = Math.min(50, Math.floor((W * H) / 18000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize(); init(); animate();
  window.addEventListener("resize", () => { resize(); init(); });
}

// ─── SCROLL & NAV EFFECTS ─────────────────────────────
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 60);
  });

  const burger = document.getElementById("burger-btn");
  const navMenu = document.getElementById("nav-menu");
  burger?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
    burger.classList.toggle("active");
  });
}