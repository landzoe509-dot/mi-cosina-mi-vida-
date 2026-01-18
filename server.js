const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', async (req, res) => {
  const videoFiles = await fs.readdir(path.join(__dirname, 'videos')).catch(()=>[]);
  const recetaFiles = await fs.readdir(path.join(__dirname, 'recetas')).catch(()=>[]);

  let videosHTML = '';
  videoFiles.forEach(v => {
    videosHTML += `<div class="video-card"><video width="100%" controls src="videos/${v}"></video><p>${v}</p></div>`;
  });

  let recetasHTML = '';
  recetaFiles.forEach(r => {
    recetasHTML += `<div class="video-card"><p>${r}</p></div>`;
  });

  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Mi Cocina Mi Vida</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body { margin:0; font-family: Arial, sans-serif; background:#fdf6e3; }
header { height:60vh; background:url('https://images.unsplash.com/photo-1504674900247-0877df9cc836') center/cover; display:flex; align-items:center; justify-content:center; color:white; }
header h1 { background: rgba(0,0,0,0.4); padding:30px; border-radius:12px; font-size:3em; text-align:center; }
nav { background:#e67e22; padding:15px; text-align:center; }
nav a { color:white; margin:0 20px; text-decoration:none; font-weight:bold; font-size:1.1em; }
section { max-width:1200px; margin:40px auto; padding:0 20px; }
h2 { color:#d35400; margin-bottom:20px; }
.video-row { display:flex; overflow-x:auto; gap:20px; padding-bottom:20px; }
.video-card { min-width:300px; background:white; padding:10px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.15); flex-shrink:0; }
.video-card video { width:100%; border-radius:8px; }
footer { background:#e67e22; color:white; text-align:center; padding:20px; margin-top:40px; font-weight:bold; }
::-webkit-scrollbar { height:8px; }
::-webkit-scrollbar-thumb { background:#d35400; border-radius:4px; }
</style>
</head>
<body>
<header>
  <h1>Mi Cocina Mi Vida</h1>
</header>
<nav>
  <a href="#videos">Videos</a>
  <a href="#recetas">Recetas</a>
  <a href="#cursos">Cursos</a>
</nav>
<section id="videos">
  <h2>🎥 Videos Destacados</h2>
  <div class="video-row">
    ${videosHTML}
  </div>
</section>
<section id="recetas">
  <h2>🍲 Recetas</h2>
  <div class="video-row">
    ${recetasHTML}
  </div>
</section>
<section id="cursos">
  <h2>🎓 Cursos</h2>
  <div class="video-row">
    <div class="video-card">Curso: Cocina básica</div>
    <div class="video-card">Curso: Cocina avanzada</div>
    <div class="video-card">Curso: Cocina profesional</div>
  </div>
</section>
<footer>
  ©️ 2026 Mi Cocina Mi Vida
</footer>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
});
