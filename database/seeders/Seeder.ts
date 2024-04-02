import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import RoleView from 'App/Models/RoleView'
import View from 'App/Models/View'

export default class extends BaseSeeder {
  public async run () {
    await Role.createMany([
      {rol: 'Developer'},
      {rol: 'Admin'},
      {rol: 'Guest'}
    ]),
    await View.createMany([
      {name: 'Categorias'},
      {name: 'Ventas'},
      {name: 'Ordenes'},
    ]),
    await RoleView.createMany([
      {role_id: 1, view_id: 1},
      {role_id: 1, view_id: 2},
      {role_id: 1, view_id: 3},
      {role_id: 2, view_id: 3}
    ])
  }
}
