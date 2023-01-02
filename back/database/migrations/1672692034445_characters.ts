import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'characters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('name', 20).unique().notNullable()
      table.integer('level').notNullable().defaultTo(1);
      table.bigInteger('exp').notNullable()
      table.integer('health').notNullable()
      table.integer('strength').notNullable()
      table.integer('dodge').notNullable()
      table.integer('speed').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
