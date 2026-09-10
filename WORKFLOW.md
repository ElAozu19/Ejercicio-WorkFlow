# 📝 FLUJO COMPLETO: Subir a GitHub y Arreglar el Bug

Sigue estos pasos **en orden exacto**. Copia y pega los comandos en tu terminal.

---

## ✅ PASO 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Login en tu cuenta
3. Click en **"+"** (arriba a la derecha) → **"New repository"**
4. Completa:
   - **Repository name:** `todo-api-typescript`
   - **Description:** `TODO API REST con TypeScript - Practice Git Workflow`
   - **Visibility:** Public
5. **NO inicialices** con README (déjalo vacío)
6. Click **"Create repository"**

**Resultado:** Te mostrará una URL como `https://github.com/TU-USUARIO/todo-api-typescript.git`

---

## ✅ PASO 2: Clonar el repositorio vacío a tu computadora

En tu terminal, en la carpeta donde guardas proyectos:

```bash
# Reemplaza TU-USUARIO con tu usuario de GitHub
git clone https://github.com/TU-USUARIO/todo-api-typescript.git

# Entrar a la carpeta
cd todo-api-typescript
```

**Resultado:** Una carpeta vacía conectada a tu repo de GitHub.

---

## ✅ PASO 3: Copiar los archivos del proyecto aquí

Copias los archivos que creamos:
- `package.json`
- `tsconfig.json`
- `.gitignore`
- `README.md`
- `WORKFLOW.md`
- Carpeta `src/` con `server.ts`

Así debe quedar tu estructura:
```
todo-api-typescript/
├── src/
│   └── server.ts
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
└── WORKFLOW.md
```

---

## ✅ PASO 4: Hacer el primer commit (código con el bug)

En la terminal dentro de `todo-api-typescript/`:

```bash
# Ver qué archivos se van a subir
git status

# Agregar todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit: TODO API TypeScript with delete bug"

# Ver el commit creado
git log
```

**Resultado:** Verás los archivos listos para subir.

---

## ✅ PASO 5: Subir a GitHub (push)

```bash
# Subir los archivos a GitHub
git push origin main

# Ver el resultado
git log --oneline
```

**Resultado:** Ve a GitHub en tu navegador. Deberías ver todos los archivos en `main`.

---

## ✅ PASO 6: Instalar dependencias y probar el bug

En la terminal:

```bash
# Instalar las librerías
npm install

# Correr el servidor en modo desarrollo
npm run dev
```

Verás:
```
✅ Servidor corriendo en http://localhost:3000
📋 GET  http://localhost:3000/api/todos
📋 POST http://localhost:3000/api/todos
🏥 HEALTH http://localhost:3000/health
```

**El servidor está corriendo. Déjalo abierto.**

---

## ✅ PASO 7: Probar que el bug existe

Abre **otra terminal** (sin cerrar la del servidor):

```bash
# Ver todas las tareas
curl http://localhost:3000/api/todos

# Intentar eliminar la tarea con ID 1
curl -X DELETE http://localhost:3000/api/todos/1

# Ver las tareas de nuevo (la tarea 1 SIGUE AHÍGIT!)
curl http://localhost:3000/api/todos
```

**Resultado:** La tarea 1 no se elimina. Ese es el bug.

**Cierra esta segunda terminal y deja el servidor corriendo.**

---

## ✅ PASO 8: Crear una rama para el fix

En una **tercera terminal** (SIN matar el servidor):

```bash
# Ver en qué rama estás
git branch

# Crear una rama nueva para el fix
git checkout -b fix/delete-todo-id-comparison

# Verificar que estás en la rama nueva
git branch
```

**Resultado:** Ahora estás en la rama `fix/delete-todo-id-comparison`.

---

## ✅ PASO 9: Arreglar el bug

Abre el archivo `src/server.ts` en tu editor favorito (VS Code, Sublime, etc).

**Busca esta línea (aprox. línea 107):**

```typescript
// ❌ BUG: req.params.id es string "1", pero estamos comparando con número
const index = todos.findIndex(t => t.id === req.params.id as any);
```

**Cámbiala por:**

```typescript
// ✅ ARREGLADO: Convertir el string a número
const index = todos.findIndex(t => t.id === parseInt(req.params.id));
```

**Guarda el archivo.** (Ctrl+S o Cmd+S)

---

## ✅ PASO 10: Probar que el fix funciona

En la terminal donde estaba el servidor:
- Presiona **Ctrl+C** para matarlo
- Corre de nuevo:

```bash
npm run dev
```

El servidor se reinicia. Ahora abre otra terminal:

```bash
# Probar eliminar la tarea 1
curl -X DELETE http://localhost:3000/api/todos/1

# Ver las tareas (tarea 1 DEBE estar eliminada)
curl http://localhost:3000/api/todos
```

**Resultado:** La tarea 1 desaparece. ✅ Bug arreglado.

**Cierra la terminal de prueba. Deja el servidor corriendo.**

---

## ✅ PASO 11: Commit del fix

En la tercera terminal (donde estaba git):

```bash
# Ver qué cambió
git status

# Ver exactamente qué cambió
git diff

# Agregar los cambios
git add .

# Crear el commit con mensaje claro
git commit -m "Fix: convert string ID to integer in DELETE endpoint

- The DELETE endpoint was comparing string IDs with numbers
- Now properly parsing the ID parameter to integer
- Fixes issue where todos could not be deleted"

# Ver el commit
git log --oneline
```

**Resultado:** El fix está commiteado en tu rama local.

---

## ✅ PASO 12: Subir la rama a GitHub (push)

```bash
# Subir la rama fix al repositorio
git push origin fix/delete-todo-id-comparison
```

**Resultado:** Ve a GitHub. Deberías ver un mensaje ofereciendo crear un Pull Request.

---

## ✅ PASO 13: Crear Pull Request en GitHub

1. Ve a `https://github.com/TU-USUARIO/todo-api-typescript`
2. Verás un botón amarillo: **"Compare & pull request"**
3. Click en él

Completa:
- **Title:** `Fix: delete todo endpoint not working`
- **Description:**
```
## Problem
The DELETE /api/todos/:id endpoint was not deleting todos.

## Root Cause
The endpoint was comparing string IDs (from req.params.id) with numeric IDs without type conversion.

## Solution
Parse the ID parameter to integer using parseInt() before comparison.

## Testing
✅ Tested locally - deletion now works correctly
```

4. Click **"Create pull request"**

**Resultado:** PR creado en GitHub.

---

## ✅ PASO 14: Review y Merge

Como es tu repo personal, tú mismo haces el merge. En la página del PR:

1. Scroll abajo
2. Click en **"Merge pull request"**
3. Click en **"Confirm merge"**

**Resultado:** El code entra a `main`. La rama está mergeada.

---

## ✅ PASO 15: Actualizar tu repo local

De vuelta en la terminal:

```bash
# Cambiar a main
git checkout main

# Traer los cambios de GitHub
git pull origin main

# Ver los commits
git log --oneline
```

**Resultado:** Tu `main` local tiene el fix. Todo sincronizado.

---

## ✅ PASO 16: Limpiar (borrar la rama local)

```bash
# Borrar la rama local que ya no necesitas
git branch -d fix/delete-todo-id-comparison

# Ver que solo queda main
git branch
```

**Resultado:** Rama limpia.

---

## 🎉 ¡COMPLETADO!

Has hecho el flujo completo:
1. ✅ Crear repo en GitHub
2. ✅ Clonar a tu computadora
3. ✅ Subir código inicial con bug
4. ✅ Crear rama para fix
5. ✅ Arreglar el bug
6. ✅ Probar que funciona
7. ✅ Commit con mensaje claro
8. ✅ Push a GitHub
9. ✅ Pull Request
10. ✅ Merge
11. ✅ Sincronizar local

---

## 📚 Comandos Git clave (referencia rápida)

```bash
# Ver status
git status

# Ver ramas
git branch

# Crear rama
git checkout -b nombre-rama

# Cambiar de rama
git checkout nombre-rama

# Ver cambios
git diff

# Agregar cambios
git add .

# Commit
git commit -m "mensaje"

# Ver commits
git log --oneline

# Subir rama
git push origin nombre-rama

# Traer cambios
git pull origin main

# Borrar rama local
git branch -d nombre-rama
```

---

## 🐛 Si algo sale mal

**El servidor no inicia:**
```bash
npm install
npm run dev
```

**No puedes hacer push:**
```bash
# Verificar que estás en la rama correcta
git branch

# Verificar remoto
git remote -v
```

**Conflicto en merge:**
- Abre el archivo con conflicto
- Resuelve manualmente
- Haz `git add .` y `git commit -m "Resolve merge conflict"`

---

¿Preguntas en algún paso? Avísame en qué te atascas. 🚀