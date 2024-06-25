# 🖥️MyTasksApp Backend

MyTasksApp Node.js es un API desarrollada con Node.js, Typescript y Express.js para la gestión de tareas diarias.

## Tecnologías Utilizadas

- Node.js
- Typescript
- Express.js
- Firestore Database
- dotenv
- Joi
- @hapi/boom
- JSON Web Token (JWT)
- Passport

## Endpoints

### Usuarios

#### Obtener usuario:

```bash
  GET /users/{email}
```

Obtiene un usuario registrado y devuelve un token de acceso.

#### Crear usuario:

```bash
  POST /users
```

Crea un nuevo usuario y devuelve un token de acceso.

### Tareas
Todas los endpoints de las tareas están protegidas por JWT.

#### Obtener todas las tareas:
```bash
  GET /tasks
```

#### Crear tarea:

```bash
  POST /tasks
```

#### Actualizar tarea:

```bash
  PUT /tasks/{taskId}
```

#### Eliminar tarea:

```bash
  DELETE /tasks/{taskId}
```

## Configuración

- **Variables de Entorno:** La aplicación utiliza dotenv para acceder a las variables de entorno. Asegúrate de configurar correctamente las variables necesarias.

## Instalación

Clona este repositorio:
```bash
  git clone https://github.com/JorgeLuisV/myTasksAppNode.git
```
Navega al directorio del proyecto:
```bash
  cd myTasksAppNode
```
Instala las dependencias:
```bash
  npm install
```

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).

