import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Games from 'App/Models/Game'

export default class GameSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Games.createMany([
      {
        release: 1992,
        name: '1943', 
        overview: 'algo de overview', 
        comment: 'commentarios', 
        imageName: '1943.jpg'
      },
      {
        release: 1991,
        name: 'Double Dragon 2', 
        overview: 'algo de overview', 
        comment: 'commentarios', 
        imageName: 'dd2.jpg'
      },
      {
        release: 1993, 
        name: 'Battletoad',
        overview: 'algo de overview', 
        comment: 'commentarios', 
        imageName: 'battletoad.jpg'
      }
    ])
  }
}
