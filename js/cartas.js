/**
 * =====================================================
 *  FTO — CARTAS DE JUGADORES
 *  Lee JUGADORES desde data.js y renderiza las cartas
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    renderCartas();
    });

    function renderCartas() {
    const grid = document.getElementById("cartas-grid");
    if (!grid || typeof JUGADORES === "undefined" || JUGADORES.length === 0) {
        grid.innerHTML = `<div class="cartas-empty">No hay jugadores registrados aún</div>`;
        return;
    }

    // Ordenar por puntos para asignar ranking
    const ordenados = [...JUGADORES].sort((a, b) =>
        b.puntos !== a.puntos ? b.puntos - a.puntos : b.pg - a.pg
    );

    grid.innerHTML = ordenados.map((j, i) => {
        const rank = i + 1;
        return buildCarta(j, rank);
    }).join("");

    // Animación de entrada escalonada
    const cartas = grid.querySelectorAll(".carta");
    cartas.forEach((carta, i) => {
        setTimeout(() => carta.classList.add("visible"), i * 80);
    });
    }

    // ─── CONSTRUYE EL HTML DE UNA CARTA ──────────────────
    function buildCarta(j, rank) {
    const inicial  = j.nombre.charAt(0).toUpperCase();
    const esLider  = rank === 1;
    const sinAvatar = !j.avatar || j.avatar.trim() === "";

    // Clases de la carta
    const cartaClass = esLider ? "carta carta-lider" : "carta";

    // Rango (medalla)
    let rankClass  = "";
    let rankEmoji  = "";
    if      (rank === 1) { rankClass = "rank-oro";    rankEmoji = "🥇"; }
    else if (rank === 2) { rankClass = "rank-plata";  rankEmoji = "🥈"; }
    else if (rank === 3) { rankClass = "rank-bronce"; rankEmoji = "🥉"; }

    // Estado dinámico
    let estadoLabel, estadoClass;
    if (esLider) {
        estadoLabel = "⚡ Líder";
        estadoClass = "badge-lider";
    } else if (j.pp === j.pj && j.pj > 0) {
        estadoLabel = "Eliminado";
        estadoClass = "badge-eliminado";
    } else {
        estadoLabel = "Activo";
        estadoClass = "badge-activo";
    }

    // Sets: separar en ganados/perdidos para mostrarlos
    const [setsG, setsP] = (j.sets || "0-0").split("-");

    // Porcentaje de victorias
    const pct = j.pj > 0 ? Math.round((j.pg / j.pj) * 100) : 0;

    // Foto o inicial
    const fotoHTML = sinAvatar
        ? `<div class="carta-foto"><div class="carta-inicial">${inicial}</div></div>`
        : `<div class="carta-foto">
            <img
            src="${j.avatar}"
            alt="Foto de ${j.nombre}"
            onerror="this.parentElement.innerHTML='<div class=\\"carta-inicial\\">${inicial}</div>'"
            />
        </div>`;

    // Ranking badge (solo top 3)
    const rankHTML = rank <= 3
        ? `<div class="carta-rank ${rankClass}">${rankEmoji} ${rank}°</div>`
        : `<div class="carta-rank">${rank}°</div>`;

    return `
        <article class="${cartaClass}" aria-label="Carta de ${j.nombre}">

        <!-- Cabecera con foto -->
        <div class="carta-header">
            <div class="carta-header-lines" aria-hidden="true"></div>
            ${fotoHTML}
            ${rankHTML}
            <div class="carta-estado-badge ${estadoClass}">${estadoLabel}</div>
        </div>

        <!-- Cuerpo -->
        <div class="carta-body">

            <div class="carta-nombre">${j.nombre}</div>
            <div class="carta-apodo">"${j.apodo}"</div>
            <div class="carta-posicion">${j.posicion || "Jugador"}</div>

            <div class="carta-sep" aria-hidden="true"></div>

            <!-- Stats principales: PJ · PG · PP -->
            <div class="carta-stats">
            <div class="stat-box">
                <span class="stat-box-val val-pj">${j.pj}</span>
                <span class="stat-box-key">PJ</span>
            </div>
            <div class="stat-box">
                <span class="stat-box-val val-pg">${j.pg}</span>
                <span class="stat-box-key">PG</span>
            </div>
            <div class="stat-box">
                <span class="stat-box-val val-pp">${j.pp}</span>
                <span class="stat-box-key">PP</span>
            </div>
            </div>

            <!-- Fila inferior: Sets + Puntos -->
            <div class="carta-stats-row">
            <div class="stat-wide">
                <span class="stat-wide-key">Sets</span>
                <span class="stat-wide-val val-sets">${j.sets || "—"}</span>
            </div>
            <div class="stat-wide">
                <span class="stat-wide-key">Pts</span>
                <span class="stat-wide-val val-puntos">${j.puntos}</span>
            </div>
            </div>

        </div><!-- /carta-body -->

        <!-- Línea neón inferior al hover -->
        <div class="carta-neon-bar" aria-hidden="true"></div>

        </article>
    `;
}