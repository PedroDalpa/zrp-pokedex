import { Module } from '@nestjs/common'
import { Pokemon } from '@modules/pokemons/pokemon.module'

@Module({
  imports: [Pokemon],
  controllers: []
})
export class AppModule {}
