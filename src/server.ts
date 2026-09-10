import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Tipos
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

// Database simulada
let todos: Todo[] = [
  { id: 1, title: 'Aprender TypeScript', completed: false, createdAt: new Date() },
  { id: 2, title: 'Practicar API REST', completed: false, createdAt: new Date() },
  { id: 3, title: 'Deployar con Amplify', completed: false, createdAt: new Date() }
];

// GET - Obtener todas las tareas
app.get('/api/todos', (req: Request, res: Response): void => {
  res.json({
    success: true,
    data: todos,
    count: todos.length
  });
});

// GET - Obtener una tarea por ID
app.get('/api/todos/:id', (req: Request, res: Response): void => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  
  if (!todo) {
    res.status(404).json({
      success: false,
      error: 'Tarea no encontrada'
    });
    return;
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// POST - Crear una nueva tarea
app.post('/api/todos', (req: Request, res: Response): void => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    res.status(400).json({
      success: false,
      error: 'El título es requerido'
    });
    return;
  }
  
  const newTodo: Todo = {
    id: Math.max(...todos.map(t => t.id), 0) + 1,
    title: title.trim(),
    completed: false,
    createdAt: new Date()
  };
  
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    message: 'Tarea creada exitosamente',
    data: newTodo
  });
});

// PUT - Actualizar una tarea
app.put('/api/todos/:id', (req: Request, res: Response): void => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  
  if (!todo) {
    res.status(404).json({
      success: false,
      error: 'Tarea no encontrada'
    });
    return;
  }
  
  if (req.body.title !== undefined) {
    todo.title = req.body.title.trim();
  }
  
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }
  
  res.json({
    success: true,
    message: 'Tarea actualizada exitosamente',
    data: todo
  });
});

// DELETE - Eliminar una tarea
// ⚠️ BUG AQUÍ: El ID se busca como string, no como número
app.delete('/api/todos/:id', (req: Request, res: Response): void => {
  // BUG: req.params.id es string "1", pero estamos comparando con número
  const index = todos.findIndex(t => t.id === req.params.id as any);
  
  if (index === -1) {
    res.status(404).json({
      success: false,
      error: 'Tarea no encontrada'
    });
    return;
  }
  
  const deletedTodo = todos.splice(index, 1);
  res.json({
    success: true,
    message: 'Tarea eliminada exitosamente',
    data: deletedTodo[0]
  });
});

// Health check
app.get('/health', (req: Request, res: Response): void => {
  res.json({
    status: 'API funcionando correctamente ✅',
    timestamp: new Date(),
    version: '1.0.0'
  });
});

// 404 Handler
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 GET  http://localhost:${PORT}/api/todos`);
  console.log(`📋 POST http://localhost:${PORT}/api/todos`);
  console.log(`🏥 HEALTH http://localhost:${PORT}/health`);
});
