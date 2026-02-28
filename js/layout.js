/* ================================================
   DATARUBRO – layout.js
   Injects sidebar + navbar into app pages
   ================================================ */

function buildLayout(activePage) {
  const user = DR.getUser();
  if (!user) { window.location.href = '../index.html'; return; }

  const alertas = DR.getAlertas();
  const unread  = alertas.filter(a => !a.leido).length;

  const sidebarHTML = `
  <nav class="navbar">
    <div class="navbar__inner">
      <a href="../index.html" class="navbar__logo">Data<span>Rubro</span></a>
      <div style="flex:1;display:flex;align-items:center;gap:12px;justify-content:flex-end">
        <span style="font-size:.82rem;color:var(--clr-muted)">
          <span id="nav-avatar" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:var(--clr-primary);color:#0b0f1a;border-radius:50%;font-weight:800;font-size:.8rem;margin-right:6px">${user.nombre.charAt(0)}</span>
          ${user.nombre} · ${user.rubro}
        </span>
        <button class="btn btn--outline btn--sm" data-action="logout">Salir</button>
      </div>
    </div>
  </nav>

  <aside class="sidebar">
    <nav class="sidebar__nav">
      <div class="sidebar__section-title">Principal</div>
      <a href="dashboard.html" class="sidebar__link" data-page="dashboard">
        <span class="icon">📊</span> Dashboard
      </a>
      <a href="ventas.html" class="sidebar__link" data-page="ventas">
        <span class="icon">💰</span> Registrar venta
      </a>
      <a href="inventario.html" class="sidebar__link" data-page="inventario">
        <span class="icon">📦</span> Inventario
      </a>

      <div class="sidebar__section-title">Análisis</div>
      <a href="alertas.html" class="sidebar__link" data-page="alertas">
        <span class="icon">🔔</span> Alertas
        ${unread > 0 ? `<span class="sidebar__badge">${unread}</span>` : ''}
      </a>
      <a href="reportes.html" class="sidebar__link" data-page="reportes">
        <span class="icon">📥</span> Reportes
      </a>

      <div class="sidebar__section-title">Cuenta</div>
      <a href="perfil.html" class="sidebar__link" data-page="perfil">
        <span class="icon">⚙️</span> Perfil
      </a>
    </nav>
    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar">${user.nombre.charAt(0)}</div>
        <div class="sidebar__user-info">
          <div class="sidebar__user-name">${user.nombre}</div>
          <div class="sidebar__user-role">${user.rubro} · ${user.plan || 'Pro'}</div>
        </div>
      </div>
    </div>
  </aside>`;

  // Inject before .page-content
  const layout = document.getElementById('app-layout');
  if (layout) layout.insertAdjacentHTML('afterbegin', sidebarHTML);

  // Set active link
  document.querySelectorAll('.sidebar__link[data-page]').forEach(link => {
    if (link.dataset.page === activePage) link.classList.add('active');
  });

  // Logout
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', () => DR.logout());
  });
}

window.buildLayout = buildLayout;