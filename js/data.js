/**
 * =====================================================
 *  FTO - FÚTBOL TENIS OTOÑAL
 *  ARCHIVO DE DATOS — Edita aquí toda la info del torneo
 * =====================================================
 */

// ─── CONFIGURACIÓN GENERAL DEL TORNEO ────────────────
const TORNEO = {
  nombre: "Fútbol Tenis Otoñal",
  siglas: "FTO",
  edicion: "2026",
  temporada: "Otoño",
  totalJugadores: 8, // Actualiza este número
  estado: "Próximamente", // "Por comenzar" | "En curso" | "Finalizado"
};

// ─── JUGADORES ────────────────────────────────────────
// Agrega, edita o elimina jugadores aquí
const JUGADORES = [
  {
    id: 1,
    nombre: "Carlos Méndez",
    apodo: "El Cañón",
    avatar: "", // opcional, si no hay se usa inicial
    pj: 3,   // Partidos jugados
    pg: 2,   // Partidos ganados
    pp: 1,   // Partidos perdidos
    sets: "6-4",
    puntos: 6,
  },
  {
    id: 2,
    nombre: "Luis Torres",
    apodo: "La Torre",
    avatar: "",
    pj: 3,
    pg: 2,
    pp: 1,
    sets: "5-4",
    puntos: 6,
  },
  {
    id: 3,
    nombre: "Andrés Peña",
    apodo: "El Toro",
    avatar: "",
    pj: 2,
    pg: 1,
    pp: 1,
    sets: "3-3",
    puntos: 3,
  },
  {
    id: 4,
    nombre: "Marcos Ruiz",
    apodo: "Rayo",
    avatar: "",
    pj: 2,
    pg: 1,
    pp: 1,
    sets: "4-3",
    puntos: 3,
  },
  {
    id: 5,
    nombre: "Diego Salinas",
    apodo: "El Mago",
    avatar: "",
    pj: 2,
    pg: 1,
    pp: 1,
    sets: "3-4",
    puntos: 3,
  },
  {
    id: 6,
    nombre: "Julián Mora",
    apodo: "El Zurdo",
    avatar: "",
    pj: 2,
    pg: 0,
    pp: 2,
    sets: "2-6",
    puntos: 0,
  },
  {
    id: 7,
    nombre: "Fernando Ríos",
    apodo: "El Gavilán",
    avatar: "",
    pj: 1,
    pg: 0,
    pp: 1,
    sets: "1-3",
    puntos: 0,
  },
  {
    id: 8,
    nombre: "Sebastián Vega",
    apodo: "Cobra",
    avatar: "",
    pj: 1,
    pg: 0,
    pp: 1,
    sets: "1-3",
    puntos: 0,
  },
];

// ─── RESULTADOS ───────────────────────────────────────
// Agregar aquí cada partido jugado
const RESULTADOS = [
  {
    id: 1,
    fecha: "2026-03-15",
    jugador1: "Carlos Méndez",
    jugador2: "Julián Mora",
    resultado: "3-1",
    ganador: "Carlos Méndez",
    sets: "3-1",
    duracion: "45 min",
    ronda: "Fase de grupos",
  },
  {
    id: 2,
    fecha: "2026-03-15",
    jugador1: "Luis Torres",
    jugador2: "Fernando Ríos",
    resultado: "3-1",
    ganador: "Fernando Ríos",
    sets: "3-1",
    duracion: "38 min",
    ronda: "Fase de grupos",
  },
  {
    id: 3,
    fecha: "2026-03-18",
    jugador1: "Andrés Peña",
    jugador2: "Sebastián Vega",
    resultado: "3-1",
    ganador: "Andrés Peña",
    sets: "3-1",
    duracion: "42 min",
    ronda: "Fase de grupos",
  },
  {
    id: 4,
    fecha: "2026-03-20",
    jugador1: "Carlos Méndez",
    jugador2: "Marcos Ruiz",
    resultado: "3-2",
    ganador: "Carlos Méndez",
    sets: "3-2",
    duracion: "55 min",
    ronda: "Fase de grupos",
  },
  {
    id: 5,
    fecha: "2026-03-22",
    jugador1: "Luis Torres",
    jugador2: "Diego Salinas",
    resultado: "3-2",
    ganador: "Luis Torres",
    sets: "3-2",
    duracion: "50 min",
    ronda: "Fase de grupos",
  },
  {
    id: 6,
    fecha: "2026-03-24",
    jugador1: "Marcos Ruiz",
    jugador2: "Julián Mora",
    resultado: "3-1",
    ganador: "Marcos Ruiz",
    sets: "3-1",
    duracion: "40 min",
    ronda: "Fase de grupos",
  },
];

// ─── PRÓXIMOS PARTIDOS ────────────────────────────────
// Agregar aquí los partidos programados
const PROXIMOS_PARTIDOS = [
  {
    id: 1,
    fecha: "2026-04-01",
    hora: "17:00",
    jugador1: "Carlos Méndez",
    jugador2: "Luis Torres",
    ronda: "Semifinal",
    destacado: true, // true = partido especial/final
  },
  {
    id: 2,
    fecha: "2026-04-01",
    hora: "18:30",
    jugador1: "Andrés Peña",
    jugador2: "Marcos Ruiz",
    ronda: "Semifinal",
    destacado: false,
  },
  {
    id: 3,
    fecha: "2026-04-05",
    hora: "17:00",
    jugador1: "Por definir",
    jugador2: "Por definir",
    ronda: "GRAN FINAL",
    destacado: true,},
];