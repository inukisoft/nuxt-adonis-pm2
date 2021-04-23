import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String 

  @column()
  public release: Number

  @column()
  public overview: String

  @column() 
  public comment: String 

  @column({columnName: 'imageName' }) 
  public imageName: String 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
