import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_views'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')
      table.integer('view_id').unsigned().references('id').inTable('views').onDelete('CASCADE')
      table.primary(['role_id', 'view_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
