# TODO API - TypeScript + Node.js

API REST para practicar el flujo completo de desarrollo con TypeScript, Git, GitHub y Deploy.

## ⚠️ Bug conocido
El endpoint `DELETE /api/todos/:id` no funciona correctamente. El ID se está comparando como string en lugar de número.

```typescript
// ❌ BUG: Comparar string con número
const index = todos.findIndex(t => t.id === req.params.id as any);

// ✅ SOLUCIÓN: Convertir a número
const index = todos.findIndex(t => t.id === parseInt(req.params.id));
```

## Requisitos previos
- Node.js 16+ instalado
- Git instalado
- Cuenta de GitHub

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo (TypeScript en tiempo real)
npm run dev

# 3. O compilar y correr
npm run build
npm start
```

El servidor corre en `http://localhost:3000`

## Estructura del proyecto

```
├── src/
│   └── server.ts          # API con TypeScript
├── dist/                  # Código compilado (ignorado en Git)
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Endpoints

### GET /api/todos
Obtiene todas las tareas.

```bash
curl http://localhost:3000/api/todos
```

Respuesta:
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

### GET /api/todos/:id
Obtiene una tarea por ID.

```bash
curl http://localhost:3000/api/todos/1
```

### POST /api/todos
Crea una nueva tarea.

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi nueva tarea"}'
```

### PUT /api/todos/:id
Actualiza una tarea.

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### DELETE /api/todos/:id
Elimina una tarea. **❌ Actualmente NO funciona por el bug**.

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Health Check

```bash
curl http://localhost:3000/health
```

---

## 📝 Flujo de trabajo (Git + GitHub)

Ver **WORKFLOW.md** para los pasos paso a paso de cómo arreglar el bug.
