import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RoleView extends BaseModel {
  @column()
  public role_id: number

  @column()
  public view_id: number
}
