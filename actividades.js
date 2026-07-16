
function renderActivityScreen(main){
  const { mod, act } = findActivity(state.currentModuleId, state.currentActivityId);
  const done = state.user.completed.includes(act.id);

  main.innerHTML = `
    <button class="back-link" id="backBtn">← volver a ${mod.title}</button>
    <div class="activity-header">
      <span class="difficulty-chip diff-${act.difficulty}">${act.difficulty}</span>
      <h1 class="page-title">${act.title}</h1>
    </div>
    <div id="activityBody"></div>
  `;
  document.getElementById("backBtn").addEventListener("click", ()=>{
    state.screen = "module"; render();
  });

  const body = document.getElementById("activityBody");

  if (act.type === "quiz" || act.type === "final"){
    renderQuizFlow(body, act, done);
  } else {
    body.innerHTML = renderExternalPanel(act, done);
    attachExternalHandlers(act, done);
  }
}

/* ---------- cuestionarios de varias preguntas ---------- */
function renderQuizFlow(body, act, done){
  const total = act.questions.length;

  // Si ya está completada, mostramos un resumen simple (no repetimos el cuestionario)
  if (done){
    body.innerHTML = `
      <div class="content-panel">
        ${act.type === "final" ? `<div class="final-progress-note">⚠ Este expediente combina conceptos de Arquitectura de Datos, Lógica de Control y El Puente Sintáctico.</div>` : ""}
        <div class="explain-panel">
          <div class="explain-label">📘 Contexto del tema</div>
          <div class="explain-text">${act.explanation}</div>
        </div>
        <div class="feedback-box show feedback-ok">Ya completaste este expediente (${total} preguntas). ¡Buen trabajo!</div>
      </div>
      <div class="activity-footer">
        <span class="points-preview">Recompensa: <b>${act.points} pts</b></span>
        <button class="btn btn-primary" disabled>Completada ✓</button>
      </div>
    `;
    return;
  }

  const quizState = { index: 0, correctCount: 0, answered: false };

  function renderStep(){
    const q = act.questions[quizState.index];
    const optionsHtml = q.options.map((opt, i) => `
      <button class="quiz-opt" data-idx="${i}">
        <span class="letter">${String.fromCharCode(65+i)}</span>${escapeHtml(opt.text)}
      </button>
    `).join("");

    body.innerHTML = `
      <div class="content-panel">
        ${act.type === "final" ? `<div class="final-progress-note">⚠ Este expediente combina conceptos de Arquitectura de Datos, Lógica de Control y El Puente Sintáctico.</div>` : ""}
        ${act.explanation ? `
          <div class="explain-panel">
            <div class="explain-label">📘 Contexto del tema</div>
            <div class="explain-text">${act.explanation}</div>
          </div>
        ` : ""}
        <div class="quiz-progress">Pregunta ${quizState.index+1} de ${total}</div>
        <div class="code-label">Fragmento a analizar</div>
        <div class="code-block">${q.code}</div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options" id="quizOptions">${optionsHtml}</div>
        <div class="feedback-box" id="feedbackBox"></div>
      </div>
      <div class="activity-footer">
        <span class="points-preview">Recompensa máxima: <b>${act.points} pts</b> · Aciertos: ${quizState.correctCount}/${quizState.index}</span>
        <button class="btn btn-primary" id="nextBtn" disabled>Selecciona una respuesta</button>
      </div>
    `;

    const optsEl = document.getElementById("quizOptions");
    const feedback = document.getElementById("feedbackBox");
    const nextBtn = document.getElementById("nextBtn");
    quizState.answered = false;

    optsEl.querySelectorAll(".quiz-opt").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        if (quizState.answered) return;
        quizState.answered = true;
        const idx = parseInt(btn.dataset.idx, 10);
        const opt = q.options[idx];
        optsEl.querySelectorAll(".quiz-opt").forEach((b,i)=>{
          b.disabled = true;
          if (q.options[i].correct) b.classList.add("correct");
          else if (i === idx) b.classList.add("incorrect");
        });
        feedback.classList.add("show", opt.correct ? "feedback-ok" : "feedback-bad");
        feedback.textContent = opt.correct ? q.feedbackOk : q.feedbackBad;
        if (opt.correct) quizState.correctCount++;

        nextBtn.disabled = false;
        nextBtn.textContent = (quizState.index === total-1) ? "Ver resultado del expediente" : "Siguiente pregunta →";
      });
    });

    nextBtn.addEventListener("click", ()=>{
      if (!quizState.answered) return;
      if (quizState.index < total-1){
        quizState.index++;
        renderStep();
      } else {
        renderSummary();
      }
    });
  }

  function renderSummary(){
    const pct = Math.round((quizState.correctCount/total)*100);
    const earned = Math.round(act.points * (quizState.correctCount/total));
    const passed = pct >= 60;
    body.innerHTML = `
      <div class="content-panel">
        <div class="quiz-question">Resultado del expediente</div>
        <div class="feedback-box show ${passed ? "feedback-ok" : "feedback-bad"}">
          Respondiste correctamente ${quizState.correctCount} de ${total} preguntas (${pct}%).
          ${passed ? " El sistema valida este expediente como resuelto." : " Necesitas al menos 60% de aciertos para que el sistema lo valide como resuelto, pero puedes marcarlo como completado igualmente."}
        </div>
      </div>
      <div class="activity-footer">
        <span class="points-preview">Puntos obtenidos: <b>${earned} / ${act.points} pts</b></span>
        <button class="btn btn-primary" id="completeBtn">Marcar expediente como completado</button>
      </div>
    `;
    document.getElementById("completeBtn").addEventListener("click", ()=> completeActivity(act.id, earned));
  }

  renderStep();
}

function renderExternalPanel(act, done){
  const isGenially = act.type === "genially";
  const hasRealUrl = act.url && act.url !== "#";
  return `
    <div class="content-panel">
      <div class="external-box">
        <p>${act.description}</p>
        ${isGenially && hasRealUrl ? `<iframe class="genially-frame" src="${act.url}" allow="fullscreen"></iframe>` : ""}
        ${hasRealUrl
          ? `<a href="${act.url}" target="_blank" rel="noopener" class="btn btn-cyan">Abrir actividad ${isGenially ? "Genially" : "JClic"} ↗</a>`
          : `<div class="feedback-box show feedback-bad" style="display:inline-block; text-align:left;">Enlace pendiente: reemplaza <span class="mono">url:"#"</span> por el enlace real de esta actividad ${labelFor(act.type)}.</div>`}
      </div>
    </div>
    <div class="activity-footer">
      <span class="points-preview">Recompensa: <b>${act.points} pts</b></span>
      <button class="btn btn-primary" id="completeExternalBtn" ${done ? "disabled" : ""}>${done ? "Completada ✓" : "Marcar como completada"}</button>
    </div>
  `;
}

function attachExternalHandlers(act, done){
  if (done) return;
  document.getElementById("completeExternalBtn").addEventListener("click", ()=> completeActivity(act.id, act.points));
}

/* ---------- completar actividad y otorgar puntos ---------- */
function completeActivity(activityId, earnedPoints){
  const { mod, act } = findActivity(state.currentModuleId, activityId);
  if (state.user.completed.includes(activityId)) return;
  const pts = (typeof earnedPoints === "number" ? earnedPoints : act.points);
  state.user.completed.push(activityId);
  state.user.points += pts;
  state.user.earnedPoints = state.user.earnedPoints || {};
  state.user.earnedPoints[activityId] = pts;
  saveProgress();
  render();
}
