function renderLogin(){
  app.innerHTML = `
    <div id="screen-login">
      <div class="boot-card">
        <div class="brand-row">
          <div class="brand-mark mono">N</div>
          <div class="brand-name">NEXO-INTERACTIVO<span style="color:var(--orange)">_</span>2026</div>
        </div>
        <div class="brand-sub">Plataforma gamificada de HTML5, CSS y JavaScript</div>
        <form id="loginForm">
          <label class="field-label" for="userName">Nombre de usuario</label>
          <input class="field-input" id="userName" type="text" placeholder="Ej. Nombre Apellido" autocomplete="off" required />
          <button type="submit" class="btn btn-primary" style="width:100%;">Acceder al sistema</button>
        </form>
        <div class="login-hint">El progreso se guarda por nombre de usuario. Vuelve a escribir el mismo nombre para continuar donde te quedaste.</div>
      </div>
    </div>
  `;
  document.getElementById("loginForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const name = document.getElementById("userName").value.trim();
    if (!name) return;
    const existing = await loadProgress(name);
    state.user = existing || { name, points: 0, completed: [] };
    state.user.watchedVideos = state.user.watchedVideos || [];
    state.user.completed = state.user.completed || [];
    state.screen = "dashboard";
    render();
    saveProgress();
  });
}

