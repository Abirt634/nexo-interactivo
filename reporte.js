function renderGeneralReport(main){
  const lvl = levelForPoints(state.user.points);
  const earned = grandPointsEarned(state.user);
  const max = grandMaxPoints();
  const pct = max ? Math.round((earned/max)*100) : 0;
  const totalActs = MODULES.flatMap(m=>m.activities).length;
  const doneActs = state.user.completed.length;

  main.innerHTML = `
    <button class="back-link" id="backBtn">← volver al panel</button>
    <div class="page-head">
      <div class="eyebrow">Reporte general</div>
      <h1 class="page-title">Resultados de ${escapeHtml(state.user.name)}</h1>
      <p class="page-desc">Resumen del puntaje obtenido en los cuatro módulos de NEXO-INTERACTIVO.</p>
    </div>

    <div class="report-panel" style="margin-bottom:22px;">
      <div class="report-score-row">
        <div>
          <div class="report-score-num">${earned}<span style="font-size:16px;color:var(--text-dim);"> / ${max} pts</span></div>
          <div class="report-score-sub">Nivel alcanzado: ${lvl.name} · ${doneActs}/${totalActs} actividades completadas</div>
        </div>
        <div class="report-track"><div class="report-fill" style="width:${pct}%;"></div></div>
      </div>
    </div>

    <div class="report-panel">
      <table class="report-table">
        <thead>
          <tr><th>Módulo</th><th>Videos</th><th>Progreso</th><th>Puntaje</th></tr>
        </thead>
        <tbody id="reportTableBody"></tbody>
      </table>
      <div style="margin-top:18px; text-align:right;">
        <button class="btn btn-primary" id="downloadReportBtn">⬇ Descargar reporte en PDF</button>
      </div>
    </div>
  `;
  document.getElementById("backBtn").addEventListener("click", ()=>{
    state.screen = "dashboard"; render();
  });
  document.getElementById("downloadReportBtn").addEventListener("click", downloadReportPdf);

  const body = document.getElementById("reportTableBody");
  MODULES.forEach(mod=>{
    const mEarned = modulePointsEarned(mod, state.user);
    const mMax = moduleMaxPoints(mod);
    const mPct = mMax ? Math.round((mEarned/mMax)*100) : 0;
    const vidsDone = mod.videos ? mod.videos.filter(v=>state.user.watchedVideos.includes(v.id)).length : 0;
    const vidsTotal = mod.videos ? mod.videos.length : 0;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span style="color:${mod.color};">●</span> ${mod.title}</td>
      <td class="mono">${vidsTotal ? vidsDone+"/"+vidsTotal : "—"}</td>
      <td><span class="mini-track"><span class="mini-fill" style="width:${mPct}%; background:${mod.color};"></span></span>${mPct}%</td>
      <td class="mono">${mEarned}/${mMax} pts</td>
    `;
    body.appendChild(tr);
  });
}

function downloadReportPdf(){
  if (!window.jspdf){
    alert("No se pudo cargar el generador de PDF. Revisa tu conexión a internet.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lvl = levelForPoints(state.user.points);
  const earned = grandPointsEarned(state.user);
  const max = grandMaxPoints();
  const pct = max ? Math.round((earned/max)*100) : 0;

  doc.setFontSize(18);
  doc.text("NEXO-INTERACTIVO 2026 — Reporte general", 14, 18);
  doc.setFontSize(11);
  doc.text(`Estudiante: ${state.user.name}`, 14, 28);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 34);
  doc.text(`Puntaje total: ${earned} / ${max} pts (${pct}%)`, 14, 40);
  doc.text(`Nivel alcanzado: ${lvl.name}`, 14, 46);

  let y = 60;
  doc.setFontSize(13);
  doc.text("Detalle por módulo", 14, y);
  y += 8;
  doc.setFontSize(10);
  MODULES.forEach(mod=>{
    const mEarned = modulePointsEarned(mod, state.user);
    const mMax = moduleMaxPoints(mod);
    doc.text(`• ${mod.title}: ${mEarned} / ${mMax} pts`, 16, y);
    y += 7;
    mod.activities.forEach(act=>{
      const done = state.user.completed.includes(act.id);
      const pts = done ? pointsForActivity(act, state.user) : 0;
      doc.text(`   - ${act.title}: ${done ? pts+" / "+act.points+" pts (completada)" : "pendiente"}`, 18, y);
      y += 6;
      if (y > 280){ doc.addPage(); y = 20; }
    });
    y += 3;
  });

  doc.save(`reporte-nexo-${state.user.name.toLowerCase().replace(/\s+/g,"-")}.pdf`);
}
