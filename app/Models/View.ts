import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class View extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column.dateTime({ autoCreate: true, serializeAs: null})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null})
  public updatedAt: DateTime

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>
}
