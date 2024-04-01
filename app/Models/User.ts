import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public email: String

  @column({ serializeAs: null })
  public password: String

  @column({ serializeAs: null })
  public role_id: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
    localKey: 'id'
  })
  public role: BelongsTo<typeof Role>
}
