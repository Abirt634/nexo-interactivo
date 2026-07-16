function renderModule(main){
  const mod = MODULES.find(m=>m.id===state.currentModuleId);
  const hasPdf = !!mod.introPdf;
  const pdfSeen = (state.user.viewedSlideDecks || []).includes(mod.id);
  const unlocked = videosWatched(mod, state.user) && (!hasPdf || pdfSeen);
  const earned = modulePointsEarned(mod, state.user);
  const maxPts = moduleMaxPoints(mod);
  const reportPct = maxPts ? Math.round((earned/maxPts)*100) : 0;

  main.innerHTML = `
    <button class="back-link" id="backBtn">← volver al panel</button>
    <div class="page-head">
      <div class="eyebrow" style="color:${mod.color}">${mod.id}</div>
      <h1 class="page-title">${mod.title}</h1>
      <p class="page-desc">${mod.desc}</p>
    </div>

    ${mod.videos && mod.videos.length ? `
      <div class="section-block">
        <div class="section-title">🎬 Introducción al tema</div>
        <div class="section-subtitle">Mira los videos para desbloquear las actividades de este módulo.</div>
        <div class="video-grid" id="videoGrid"></div>
      </div>
    ` : ""}

    ${hasPdf ? `
      <div class="section-block">
        <div class="section-title">📄 Presentación del tema</div>
        <div class="section-subtitle">Revisa la presentación completa para desbloquear las actividades de este módulo.</div>
        <div class="pdf-viewer" id="pdfViewerBox">
          <iframe src="${mod.introPdf}" class="pdf-frame" title="Presentación ${mod.title}"></iframe>
          <div class="pdf-actions">
            <button class="btn btn-ghost" id="pdfFullscreenBtn" style="padding:8px 16px; font-size:13px;">⛶ Pantalla completa</button>
            <a href="${mod.introPdf}" target="_blank" rel="noopener" class="btn btn-ghost" style="padding:8px 16px; font-size:13px;">Abrir en pestaña nueva ↗</a>
            <button class="btn btn-primary" id="pdfFinish" style="padding:8px 18px; font-size:13px;" ${pdfSeen ? "disabled" : ""}>
              ${pdfSeen ? "Presentación vista ✓" : "Marcar como revisada"}
            </button>
          </div>
        </div>
      </div>
    ` : ""}

    <div class="section-block">
      <div class="section-title">📂 Actividades</div>
      <div class="section-subtitle">${unlocked ? "Completa cada expediente para ganar puntos." : "Disponibles al terminar la introducción al tema."}</div>
      ${!unlocked ? `<div class="lock-notice">🔒 Termina la introducción al tema (video y/o presentación) para desbloquear las actividades de este módulo.</div>` : ""}
      <div class="activity-list ${unlocked ? "" : "is-locked"}" id="activityList"></div>
    </div>

    <div class="section-block">
      <div class="section-title">📊 Reporte del módulo</div>
      <div class="section-subtitle">Tu puntaje acumulado en ${mod.title}.</div>
      <div class="report-panel">
        <div class="report-score-row">
          <div>
            <div class="report-score-num">${earned}<span style="font-size:16px;color:var(--text-dim);"> / ${maxPts} pts</span></div>
            <div class="report-score-sub">${reportPct}% completado</div>
          </div>
          <div class="report-track"><div class="report-fill" style="width:${reportPct}%;"></div></div>
        </div>
        <div class="report-list" id="moduleReportList"></div>
      </div>
    </div>
  `;
  document.getElementById("backBtn").addEventListener("click", ()=>{
    state.screen = "dashboard"; render();
  });

  /* videos */
  if (mod.videos && mod.videos.length){
    const vg = document.getElementById("videoGrid");
    mod.videos.forEach(v=>{
      const watched = state.user.watchedVideos.includes(v.id);
      const card = document.createElement("div");
      card.className = "video-card";
      card.innerHTML = `
        <div class="video-thumb">
          <a
            href="${v.url}"
            target="_blank"
            rel="noopener"
            class="play-icon">▶</a>
          <span class="duration">${v.duration}</span>
        </div>
        <div class="video-title">${v.title}</div>
        <div class="video-desc">${v.desc}</div>
        <div class="video-actions">
          ${v.url && v.url !== "#" ? `<a href="${v.url}" target="_blank" rel="noopener" class="btn btn-ghost" style="padding:7px 12px; font-size:12.5px;">Ver video ↗</a>` : `<span style="font-size:11px; color:var(--text-faint); font-family:var(--mono);">enlace pendiente</span>`}
          ${watched
            ? `<span class="video-watched-tag">✓ Visto</span>`
            : `<button class="btn btn-cyan" data-video="${v.id}" style="padding:7px 12px; font-size:12.5px;">Marcar como visto</button>`}
        </div>
      `;
      vg.appendChild(card);
      if (!watched){
        card.querySelector("[data-video]").addEventListener("click", ()=> markVideoWatched(v.id));
      }
    });
  }

  /* PDF de introducción */
  if (hasPdf){
    const pdfBtn = document.getElementById("pdfFinish");
    if (pdfBtn && !pdfSeen){
      pdfBtn.addEventListener("click", ()=> markPdfViewed(mod.id));
    }
  }

  const fsBtn = document.getElementById("pdfFullscreenBtn");
    const pdfBox = document.getElementById("pdfViewerBox");
    if (fsBtn && pdfBox){
      const exitOnEscape = (e)=>{
        if (e.key === "Escape") salirPantallaCompleta();
      };
      const salirPantallaCompleta = ()=>{
        pdfBox.classList.remove("is-fullscreen");
        fsBtn.textContent = "⛶ Pantalla completa";
        document.removeEventListener("keydown", exitOnEscape);
      };
      fsBtn.addEventListener("click", ()=>{
        const activo = pdfBox.classList.toggle("is-fullscreen");
        fsBtn.textContent = activo ? "✕ Salir de pantalla completa" : "⛶ Pantalla completa";
        if (activo) document.addEventListener("keydown", exitOnEscape);
        else document.removeEventListener("keydown", exitOnEscape);
      });
    }

  /* actividades */
  const list = document.getElementById("activityList");
  mod.activities.forEach(act => {
    const done = state.user.completed.includes(act.id);
    const row = document.createElement("div");
    row.className = "activity-card";
    row.style.cursor = unlocked ? "pointer" : "not-allowed";
    row.innerHTML = `
      <div class="activity-icon ${act.type}">${iconFor(act.type)}</div>
      <div class="activity-main">
        <div class="activity-title">${act.title}</div>
        <div class="activity-meta">${labelFor(act.type)} · ${act.points} pts · dificultad ${act.difficulty}</div>
      </div>
      <div class="activity-status ${done ? 'status-done' : 'status-pending'}">${done ? "Completada" : "Pendiente"}</div>
    `;
    if (unlocked){
      row.addEventListener("click", ()=>{
        state.currentActivityId = act.id; state.screen = "activity"; render();
      });
    }
    list.appendChild(row);
  });

  const repList = document.getElementById("moduleReportList");
  mod.activities.forEach(act=>{
    const done = state.user.completed.includes(act.id);
    const row = document.createElement("div");
    row.className = "report-row" + (done ? " earned" : "");
    const pts = done ? pointsForActivity(act, state.user) : 0;
    row.innerHTML = `<span class="rname">${act.title}</span><span class="rpts">${done ? "+"+pts : "0"} / ${act.points} pts</span>`;
    repList.appendChild(row);
  });
}

async function markVideoWatched(videoId){
  if (!state.user.watchedVideos.includes(videoId)){
    state.user.watchedVideos.push(videoId);
    await saveProgress();
  }
  render();
}

async function markPdfViewed(moduleId){
  state.user.viewedSlideDecks = state.user.viewedSlideDecks || [];
  if (!state.user.viewedSlideDecks.includes(moduleId)){
    state.user.viewedSlideDecks.push(moduleId);
    await saveProgress();
  }
  render();
}