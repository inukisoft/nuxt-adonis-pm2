import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Games extends BaseSchema {
  protected tableName = 'games'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('name').notNullable()
      table.integer('release').notNullable()
      table.string('overview').notNullable()
      table.string('comment').notNullable()
      table.string('imageName').notNullable()  
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
