import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login')
Route.post('/register', 'UsersController.register')

Route.group(() => {
  Route.get('/getRole', 'UsersController.getRole')

  Route.group(() => {
    Route.get('/users', 'UsersController.index')
    Route.get('/users/:id', 'UsersController.show')
    Route.post('/users', 'UsersController.store')
    Route.put('/users/:id', 'UsersController.update')
    Route.delete('/users/:id', 'UsersController.destroy')
  }).middleware('role:1')

  Route.group(() => {
    Route.get('/roles', 'RolesController.index')
    Route.get('/roles/:id', 'RolesController.show')
    Route.post('/roles', 'RolesController.store')
    Route.put('/roles/:id', 'RolesController.update')
  })

  Route.group(() => {
    Route.get('/views', 'ViewsController.index')
    Route.get('/views/:id', 'ViewsController.show')
    Route.post('/views', 'ViewsController.store')
    Route.put('/views/:id', 'ViewsController.update')
  })

  Route.group(() => {
    Route.get('/getViews/:id', 'RoleViewsController.getViewsByRole')
    Route.put('/roleViews/:id', 'RoleViewsController.update')
  })
}).middleware('jwt')

