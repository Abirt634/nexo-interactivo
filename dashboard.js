function renderShell(){
  const lvl = levelForPoints(state.user.points);
  const pct = lvl.next ? Math.min(100, Math.round(((state.user.points - lvl.floor) / (lvl.next - lvl.floor))*100)) : 100;

  app.innerHTML = `
    <header id="topbar">
      <div class="brand-row">
        <div class="brand-mark mono" style="width:32px;height:32px;font-size:13px;">N</div>
        <div class="brand-name" style="font-size:15px;">NEXO-INTERACTIVO<span style="color:var(--orange)">_</span>2026</div>
      </div>
      <div class="topbar-right">
        <span class="user-chip">Sesión: <b>${escapeHtml(state.user.name)}</b></span>
        <div class="stat-pill">🏆 <b>${state.user.points}</b> pts</div>
        <button class="btn btn-ghost" id="reportBtn" style="padding:8px 14px;">Reporte general</button>
        <button class="btn btn-ghost" id="logoutBtn" style="padding:8px 14px;">Salir</button>
      </div>
    </header>
    <main id="mainArea"></main>
    <footer>NEXO-INTERACTIVO 2026 · Facultad de Filosofía, Letras y Ciencias de la Educación · UCE</footer>
  `;
  document.getElementById("logoutBtn").addEventListener("click", ()=>{
    state.screen = "login"; state.user = null; render();
  });
  document.getElementById("reportBtn").addEventListener("click", ()=>{
    state.screen = "report"; render();
  });

  const main = document.getElementById("mainArea");
  if (state.screen === "dashboard") renderDashboard(main, lvl, pct);
  else if (state.screen === "module") renderModule(main);
  else if (state.screen === "activity") renderActivityScreen(main);
  else if (state.screen === "report") renderGeneralReport(main);
}

function renderDashboard(main, lvl, pct){
  const totalActs = MODULES.flatMap(m=>m.activities).length;
  const doneActs = state.user.completed.length;

  main.innerHTML = `
    <div class="page-head">
      <div class="eyebrow">Panel de control</div>
      <h1 class="page-title">Hola, ${escapeHtml(state.user.name.split(" ")[0])} 👋</h1>
      <p class="page-desc">Completa las actividades de cada módulo para acumular puntos y subir de nivel. El Reto Final se desbloquea al completar los tres módulos anteriores.</p>
    </div>

    <div class="level-panel">
      <div class="level-badge mono">${lvl.short}</div>
      <div class="level-info">
        <div class="level-name">Nivel: ${lvl.name}</div>
        <div class="level-sub">${lvl.next ? (lvl.next - state.user.points) + " pts para el siguiente nivel" : "Nivel máximo alcanzado"}</div>
        <div class="xp-track"><div class="xp-fill" style="width:${pct}%;"></div></div>
      </div>
      <div class="overall-stat">
        <div class="num">${state.user.points}</div>
        <div class="lbl">Puntos</div>
      </div>
      <div class="overall-stat">
        <div class="num">${doneActs}/${totalActs}</div>
        <div class="lbl">Actividades</div>
      </div>
    </div>

    <div class="module-grid" id="moduleGrid"></div>
  `;

  const grid = document.getElementById("moduleGrid");
  MODULES.forEach(mod => {
    const unlocked = moduleUnlocked(mod, state.user);
    const doneCount = mod.activities.filter(a=>state.user.completed.includes(a.id)).length;
    const modPct = Math.round((doneCount / mod.activities.length) * 100);
    const complete = doneCount === mod.activities.length;

    const card = document.createElement("div");
    card.className = "module-card" + (unlocked ? "" : " locked");
    card.style.setProperty("--m-color", mod.color);
    card.innerHTML = `
      ${complete ? '<div class="complete-badge">✓ COMPLETO</div>' : (!unlocked ? '<div class="lock-badge">🔒</div>' : "")}
      <div class="module-tag"><span class="dot"></span>${mod.id}</div>
      <div class="module-title">${mod.title}</div>
      <div class="module-desc">${mod.desc}</div>
      <div class="module-progress-row">
        <div class="module-track"><div class="module-fill" style="width:${modPct}%; background:${mod.color};"></div></div>
        <div class="module-count">${doneCount}/${mod.activities.length}</div>
      </div>
    `;
    if (unlocked){
      card.addEventListener("click", ()=>{
        state.currentModuleId = mod.id; state.screen = "module"; render();
      });
    }
    grid.appendChild(card);
  });
}
