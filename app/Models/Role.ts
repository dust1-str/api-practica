import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import View from './View'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rol: String

  @column.dateTime({ autoCreate: true, serializeAs: null})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null})
  public updatedAt: DateTime

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @manyToMany(() => View, {
    pivotTable: 'role_views',
  })
  public views: ManyToMany<typeof View>
}
