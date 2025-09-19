# 🧪 Prueba Técnica - Ikusi Latam

Este proyecto es una **prueba técnica** desarrollada para aplicar a la posición de **Desarrollador Frontend en Ikusi**.  
Está construido con **React + Vite**, utilizando **TailwindCSS** para los estilos y **Recharts** para las visualizaciones gráficas.

---

## 🚀 Ejecución del proyecto

```bash
git clone git@github.com:JCorxs/prueba-tecnica-ikusi.git
cd prueba-react-vite
npm install
npm run dev
```

El proyecto estará disponible en **http://localhost:5173**.

---

## ⚡ Explicación del proyecto

```
Consiste en un dashboard que muestra a través de un gráfico especies de animales avistadas ordenadas de forma jerárquica: "Clase > Familia > Especie"; para poder acceder, se debe iniciar sesión.

```


---

## 📂 Estructura del proyecto

```
prueba-react-vite/
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ public/
│  └─ index.html
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ types.ts
   ├─ styles/
   │  └─ index.css
   ├─ contexts/
   │  └─ AuthContext.tsx
   ├─ services/
   │  └─ mockApi.ts
   ├─ hooks/
   │  └─ useAsync.ts
   ├─ components/
   │  ├─ ProtectedRoute.tsx
   │  ├─ Loading.tsx
   │  ├─ ErrorMessage.tsx
   │  ├─ HierarchyTree.tsx
   │  └─ ChartView.tsx
   └─ views/
      ├─ LoginPage.tsx
      └─ DashboardPage.tsx
```

---

## 📦 Librerías utilizadas

- **React** y **React DOM** – UI y renderizado.
- **React Router DOM** – Navegación entre vistas.
- **Recharts** – Visualización de datos.
- **TailwindCSS**, **PostCSS**, **Autoprefixer** – Estilos modernos y utilitarios.
- **Vite** – Bundler rápido para desarrollo.

---

✍️ **Autor:** [Juan Carlos Alonso Pérez]
