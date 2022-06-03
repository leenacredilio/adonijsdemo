/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
Route.post('register', 'UsersController.store');
Route.post('login', 'UsersController.login');
Route.post('logout', 'UsersController.logout');
// Route.group(() => {
//   Route.post("register", "UsersController.register");
//   // Route.post("login", "AuthController.login");
//   // Route.group(() => {
//   //   Route.resource("posts", "PostsController").apiOnly();
//   //   Route.resource("forums", "ForumsController").apiOnly();
//   //   Route.get("users/forums", "UsersController.forumsByUser");
//   //   Route.get("users/posts", "UsersController.postsByUser");
//   // }).middleware("auth:api");
// }).prefix("api");
// Route.post('/register', 'UsersController.register').as('auth.register')
// Route.post('/register', 'UsersController.register')
// Route.resource('auth', 'UsersController').apiOnly()
// Route.post('/register', async (ctx) => {
//   console.log('ddddd')
//   const { default: UserController } = await import(
//     '../app/Controllers/Http/UsersController'
//   )
//   return new UserController().register(ctx)
// })
// Route.get('/', async () => {
//   return { hello: 'world' }
// })
