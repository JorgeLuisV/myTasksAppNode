# 🖥️MyTasksApp Backend

MyTasksApp Node.js es un API desarrollada con Node.js, Typescript y Express.js para la gestión de tareas diarias.

## Tecnologías Utilizadas

- Node.js
- Typescript
- Express.js
- Firestore Database
- dotenv
- Joi
- hapi/boom
- JSON Web Token (JWT)
- Passport

## Endpoints

### Usuarios

#### Obtener usuario:

```bash
  GET /api/users/{email}
```

Obtiene un usuario registrado y devuelve un token de acceso.

#### Crear usuario:

```bash
  POST /api/users
```

Crea un nuevo usuario y devuelve un token de acceso.

### Tareas
Todas los endpoints de las tareas están protegidas por JWT.

#### Obtener todas las tareas:
```bash
  GET /api/tasks
```

#### Crear tarea:

```bash
  POST /api/tasks
```

#### Actualizar tarea:

```bash
  PUT /api/tasks/{taskId}
```

#### Eliminar tarea:

```bash
  DELETE /api/tasks/{taskId}
```

## Configuración

- **Variables de Entorno:** La aplicación utiliza dotenv para acceder a las variables de entorno. Asegúrate de configurar correctamente las variables necesarias.

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/JorgeLuisV/myTasksAppNode.git
```

2. Navega al directorio functions dentro del proyecto :
```bash
cd myTasksAppNode/functions
```

3. Instala las dependencias:
```bash
npm install
```

4. Haz una copia del archivo ``.env.example`` y renómbralo a ``.env``, luego ingresa al archivo y asigna un valor a la variable de entorno.

5. Compila el proyecto
```bash
npm run build
```
6. Regresa a la raiz del proyecto
```bash
cd..
```
7. Ejecuta el emulador y ve a la URL que te proporciona.
```bash
firebase emulators:start --only functions
```


## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).

