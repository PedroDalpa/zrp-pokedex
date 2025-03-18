import { Module } from '@nestjs/common'
import { DefaultController } from '@infra/controllers/pokemon/pokemon.controller'
import { FindAbilitiesByNameUseCase } from './useCases/findAbilitiesByName/FindAbilitiesByNameUseCase'
import { PokeApiModule } from '@infra/external/pokemonAPI/pokeApi.module'

@Module({
  controllers: [DefaultController],
  providers: [FindAbilitiesByNameUseCase],
  imports: [PokeApiModule]
})
export class Pokemon {}
