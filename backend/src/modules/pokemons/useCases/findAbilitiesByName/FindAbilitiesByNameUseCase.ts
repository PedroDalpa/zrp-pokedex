import { Injectable } from '@nestjs/common'
import { PokeApiService } from '@infra/external/pokemonAPI/pokeApi.service'

@Injectable()
class FindAbilitiesByNameUseCase {
  constructor(private readonly pokemonApiService: PokeApiService) {}
  async execute(name: string): Promise<string[]> {
    const { abilities } =
      await this.pokemonApiService.getAbilitiesByPokemonName(name)

    const abilitiesOrderByName = abilities
      .sort((abilityA, abilityB) => {
        return abilityA.ability.name.localeCompare(abilityB.ability.name)
      })
      .map(({ ability }) => ability.name)

    return abilitiesOrderByName
  }
}

export { FindAbilitiesByNameUseCase }
