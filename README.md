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
```

---

## 🚀 Cómo publicar en GitHub Pages

### Paso 1 – Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Clic en **"New repository"**
3. Nombre: `datarubro`
4. Marca **"Public"**
5. **NO** marques "Add a README" (ya tiene uno)
6. Clic en **"Create repository"**

### Paso 2 – Subir el proyecto desde VS Code

Abre VS Code y la carpeta del proyecto, luego en la terminal:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🚀 Proyecto DataRubro inicial"

# Conectar con GitHub (reemplaza TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/datarubro.git

# Subir al repositorio
git branch -M main
git push -u origin main
```

### Paso 3 – Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Clic en **"Settings"** (pestaña superior)
3. En el menú lateral: **"Pages"**
4. En **"Source"**: selecciona `Deploy from a branch`
5. En **"Branch"**: selecciona `main` y carpeta `/root`
6. Clic en **"Save"**
7. Espera 1-2 minutos

Tu sitio estará en: `https://TU-USUARIO.github.io/datarubro`

---

## 🔄 Actualizar el sitio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "descripción del cambio"
git push
```

GitHub Pages se actualiza automáticamente en ~1 minuto.

---

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

- HTML5 + CSS3 + JavaScript vanilla
- Sin frameworks ni dependencias externas
- Almacenamiento en `localStorage` (solo en el navegador)
- Compatible con GitHub Pages (100% estático)

---

## 📝 Notas

- Los datos se guardan en el **navegador del usuario** (localStorage)
- La cuenta demo carga datos de ejemplo automáticamente
- Para producción real, se requeriría un backend con base de datos
- El proyecto es 100% frontend y desplegable en cualquier hosting estático

---

*Desarrollado como proyecto de E-Business · DataRubro © 2025*
