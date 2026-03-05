# 📊 DataRubro

**Inteligencia de datos para pequeños y medianos negocios del Perú**

DataRubro es una plataforma digital que ayuda a micro y pequeños empresarios a tomar mejores decisiones usando sus propios datos de ventas e inventario. Sin conocimientos técnicos, sin instalación.

🌐 **Demo en vivo:** [jhoandryA.github.io/datarubro](https://jhoandryA.github.io/datarubro)

---

## 📁 Estructura del proyecto

```
datarubro/
├── index.html              ← Landing page pública
├── css/
│   ├── main.css            ← Variables, reset, componentes globales
│   ├── landing.css         ← Estilos de la landing page
│   └── app.css             ← Estilos de las páginas de la app
├── js/
│   ├── utils.js            ← Funciones compartidas (storage, charts, KPIs)
│   └── layout.js           ← Sidebar/navbar dinámico
├── pages/
│   ├── login.html          ← Inicio de sesión
│   ├── register.html       ← Registro (3 pasos: rubro → datos → confirmación)
│   ├── dashboard.html      ← Dashboard con KPIs y gráficas
│   ├── ventas.html         ← Registro de ventas
│   ├── inventario.html     ← Gestión de inventario
│   ├── alertas.html        ← Alertas automáticas y recomendaciones
│   ├── reportes.html       ← Reportes descargables (CSV/TXT)
│   └── perfil.html         ← Perfil y configuración
└── README.md


## ✨ Funcionalidades

| Módulo | Descripción |
|--------|-------------|
| 🏠 Landing page | Presentación del producto con precios y features |
| 🔐 Registro / Login | Flujo de 3 pasos, selección de rubro, datos demo |
| 📊 Dashboard | KPIs en tiempo real, gráficas, ventas recientes |
| 💰 Registrar ventas | Formulario con autocompletado de inventario |
| 📦 Inventario | CRUD completo, alertas de stock, filtros |
| 🔔 Alertas | Alertas automáticas clasificadas con recomendaciones |
| 📥 Reportes | Descarga de CSV y resumen ejecutivo TXT |
| ⚙️ Perfil | Gestión de cuenta, exportar/importar datos |

---

## 🛠️ Tecnologías

- HTML
- CSS 
- JavaScript
---

## 📝 Notas

- Los datos se guardan en el **navegador del usuario** (localStorage)
- La cuenta demo carga datos de ejemplo automáticamente
- Para producción real, se requeriría un backend con base de datos
- El proyecto es 100% frontend y desplegable en cualquier hosting estático

---

*Desarrollado como proyecto de E-Business · DataRubro © 2026*
