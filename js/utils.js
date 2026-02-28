/* ================================================
   DATARUBRO – utils.js
   Shared utilities: Storage, Toast, Auth, Charts
   ================================================ */

// ---- LOCAL STORAGE HELPERS ----
const DR = {
  save(key, data) {
    try { localStorage.setItem('dr_' + key, JSON.stringify(data)); } catch(e) {}
  },
  load(key, fallback = null) {
    try {
      const v = localStorage.getItem('dr_' + key);
      return v ? JSON.parse(v) : fallback;
    } catch(e) { return fallback; }
  },
  remove(key) { localStorage.removeItem('dr_' + key); },

  // User session
  getUser() { return this.load('user'); },
  setUser(u) { this.save('user', u); },
  logout()   { this.remove('user'); window.location.href = '../index.html'; },
  requireAuth() {
    if (!this.getUser()) { window.location.href = '../index.html'; return false; }
    return true;
  },

  // Business data
  getVentas()    { return this.load('ventas', []); },
  setVentas(v)   { this.save('ventas', v); },
  getInventario(){ return this.load('inventario', []); },
  setInventario(i){ this.save('inventario', i); },
  getAlertas()   { return this.load('alertas', []); },
  setAlertas(a)  { this.save('alertas', a); },
};

// ---- TOAST NOTIFICATIONS ----
function toast(title, msg = '', type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast ${type === 'warning' ? 'warn' : type === 'error' ? 'error' : ''}`;
  el.innerHTML = `<div class="toast__title">${title}</div>${msg ? `<div class="toast__msg">${msg}</div>` : ''}`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(120%)'; el.style.transition='.3s ease'; setTimeout(()=>el.remove(), 350); }, 3500);
}

// ---- NAVBAR USER INFO ----
function initNavbar(activePage) {
  const user = DR.getUser();
  if (!user) return;

  // Update nav user badge if present
  const navUser = document.getElementById('nav-user-name');
  if (navUser) navUser.textContent = user.nombre;

  const navRubro = document.getElementById('nav-rubro');
  if (navRubro) navRubro.textContent = user.rubro;

  const avatar = document.getElementById('nav-avatar');
  if (avatar) avatar.textContent = user.nombre.charAt(0).toUpperCase();

  // Sidebar link highlight
  document.querySelectorAll('.sidebar__link[data-page]').forEach(link => {
    if (link.dataset.page === activePage) link.classList.add('active');
  });

  // Logout button
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', () => { DR.logout(); });
  });
}

// ---- SIMPLE SVG BAR CHART ----
function drawBarChart(canvasId, labels, values, color = '#00c896') {
  const container = document.getElementById(canvasId);
  if (!container) return;
  const max = Math.max(...values, 1);
  const bars = labels.map((lbl, i) => {
    const pct = (values[i] / max) * 100;
    return `
      <div class="bar-chart__col">
        <div class="bar-chart__bar ${i === values.indexOf(Math.max(...values)) ? 'highlight' : ''}"
             style="height:${pct}%" title="${lbl}: ${values[i]}"></div>
        <span class="bar-chart__label">${lbl}</span>
      </div>`;
  }).join('');
  container.innerHTML = `<div class="bar-chart">${bars}</div>`;
}

// ---- SIMPLE SVG LINE CHART ----
function drawLineChart(svgId, values, color = '#00c896') {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const W = 400, H = 120, pad = 10;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = H - pad - (v / max) * (H - pad * 2);
    return `${x},${y}`;
  });
  const areaPath = `M ${pts[0]} L ${pts.join(' L ')} L ${pts[pts.length-1].split(',')[0]},${H} L ${pts[0].split(',')[0]},${H} Z`;
  const linePath = `M ${pts.join(' L ')}`;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = `
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity=".3"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${areaPath}" fill="url(#lg)"/>
    <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
    ${pts.map(p => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="3.5" fill="${color}"/>`).join('')}
  `;
}

// ---- DONUT CHART ----
function drawDonut(svgId, segments) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const R = 40, cx = 60, cy = 60, stroke = 18;
  const total = segments.reduce((s, x) => s + x.value, 0);
  let offset = -Math.PI / 2;
  const paths = segments.map(seg => {
    const angle = (seg.value / total) * Math.PI * 2;
    const x1 = cx + R * Math.cos(offset);
    const y1 = cy + R * Math.sin(offset);
    offset += angle;
    const x2 = cx + R * Math.cos(offset);
    const y2 = cy + R * Math.sin(offset);
    const large = angle > Math.PI ? 1 : 0;
    return `<path d="M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} Z" fill="${seg.color}" opacity=".9"/>`;
  });
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.innerHTML = `
    <circle cx="${cx}" cy="${cy}" r="${R + stroke/2}" fill="none" stroke="var(--clr-border)" stroke-width="${stroke}"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="var(--clr-card)"/>
    ${paths.join('')}
  `;
}

// ---- GENERATE SAMPLE DATA (for demo) ----
function generateSampleData(rubro) {
  const rubroConfig = {
    'Bodega':      { productos: ['Coca-Cola 1.5L','Jabón Bolívar','Arroz 1kg','Aceite Primor','Pan de molde','Agua San Luis','Galletas Oreo','Atún Fanny'], margen: 18 },
    'Restaurante': { productos: ['Menú del día','Lomo saltado','Ceviche','Arroz con leche','Inca Kola','Café','Pollo a la brasa','Seco de pollo'], margen: 35 },
    'Farmacia':    { productos: ['Paracetamol 500mg','Ibuprofeno 400mg','Omeprazol 20mg','Vitamina C','Alcohol 70%','Gasas','Termómetro','Mascarillas'], margen: 28 },
    'Ferretería':  { productos: ['Clavo 2"','Pintura látex blanca','Cinta teflón','Llave francesa','Foco LED 9W','Broca 8mm','PVC 2"','Cemento Pacasmayo'], margen: 22 },
    'Librería':    { productos: ['Cuaderno 100h','Lapiceros BIC','Corrector','Colores Faber','Goma UHU','Folder manila','Papel bond A4','Resaltador'], margen: 30 },
    'Ropa':        { productos: ['Polo algodón','Jean slim','Buzo deportivo','Medias','Polo niño','Blusa dama','Casaca','Zapatillas'], margen: 45 },
  };
  const cfg = rubroConfig[rubro] || rubroConfig['Bodega'];
  const ventas = [];
  const today = new Date();
  for (let d = 29; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);
    const numVentas = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < numVentas; i++) {
      const prod = cfg.productos[Math.floor(Math.random() * cfg.productos.length)];
      const qty  = Math.floor(Math.random() * 5) + 1;
      const precio = Math.floor(Math.random() * 30 + 3) * 0.5;
      ventas.push({
        id: `V${Date.now()}${Math.random().toString(36).slice(2,6)}`,
        fecha: date.toISOString().split('T')[0],
        producto: prod,
        cantidad: qty,
        precio: precio,
        total: +(qty * precio).toFixed(2),
        tipo: 'venta',
      });
    }
  }
  const inventario = cfg.productos.map(p => ({
    id: `P${Math.random().toString(36).slice(2,8)}`,
    nombre: p,
    stock: Math.floor(Math.random() * 50) + 2,
    stockMin: 5,
    precio: +(Math.random() * 28 + 2).toFixed(2),
    costo: +(Math.random() * 15 + 1).toFixed(2),
    categoria: 'General',
  }));
  return { ventas, inventario };
}

// ---- COMPUTE KPIs ----
function computeKPIs(ventas, inventario) {
  const hoy = new Date().toISOString().split('T')[0];
  const mes = hoy.slice(0, 7);
  const ventasHoy = ventas.filter(v => v.fecha === hoy);
  const ventasMes = ventas.filter(v => v.fecha.startsWith(mes));
  const ingresosHoy = ventasHoy.reduce((s, v) => s + v.total, 0);
  const ingresosMes = ventasMes.reduce((s, v) => s + v.total, 0);
  const ticketProm  = ventasMes.length ? ingresosMes / ventasMes.length : 0;
  const stockBajo   = inventario.filter(p => p.stock <= p.stockMin).length;
  return { ingresosHoy, ingresosMes, ticketProm, numVentasHoy: ventasHoy.length, numVentasMes: ventasMes.length, stockBajo };
}

// ---- GENERATE ALERTS ----
function generateAlertas(ventas, inventario) {
  const alertas = [];
  // Stock bajo
  inventario.filter(p => p.stock <= p.stockMin).forEach(p => {
    alertas.push({
      id: 'a' + p.id,
      tipo: p.stock === 0 ? 'error' : 'warn',
      titulo: p.stock === 0 ? `Sin stock: ${p.nombre}` : `Stock bajo: ${p.nombre}`,
      desc: `Solo quedan ${p.stock} unidades (mínimo: ${p.stockMin}).`,
      recomendacion: `Reabastecer al menos ${p.stockMin * 3} unidades antes de agotar existencias.`,
      fecha: new Date().toISOString(),
      leido: false,
    });
  });
  // Ventas bajas
  const hoy = new Date();
  const ayer = new Date(hoy); ayer.setDate(hoy.getDate() - 1);
  const ayerStr = ayer.toISOString().split('T')[0];
  const ventasAyer = ventas.filter(v => v.fecha === ayerStr);
  if (ventasAyer.length < 3) {
    alertas.push({
      id: 'av1',
      tipo: 'info',
      titulo: 'Pocas ventas ayer',
      desc: `Solo ${ventasAyer.length} ventas registradas el día de ayer.`,
      recomendacion: 'Considera lanzar una promoción o revisar horarios de mayor afluencia.',
      fecha: ayerStr,
      leido: false,
    });
  }
  return alertas;
}

// ---- FORMAT HELPERS ----
function fmt(n) { return 'S/ ' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
function fmtDate(d) { if (!d) return ''; const dt = new Date(d + 'T00:00:00'); return dt.toLocaleDateString('es-PE', { day:'2-digit', month:'short', year:'numeric' }); }

// ---- EXPORT (for module-like usage without bundler) ----
window.DR = DR;
window.toast = toast;
window.initNavbar = initNavbar;
window.drawBarChart = drawBarChart;
window.drawLineChart = drawLineChart;
window.drawDonut = drawDonut;
window.generateSampleData = generateSampleData;
window.computeKPIs = computeKPIs;
window.generateAlertas = generateAlertas;
window.fmt = fmt;
window.fmtDate = fmtDate;