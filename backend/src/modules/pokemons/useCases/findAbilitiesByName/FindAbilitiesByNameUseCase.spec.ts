import { FindAbilitiesByNameUseCase } from './FindAbilitiesByNameUseCase'
import { PokemonService } from '@infra/external/pokemonAPI/pokeApi.service'
import { Test, TestingModule } from '@nestjs/testing'

let useCase: FindAbilitiesByNameUseCase
let pokemonService: PokemonService

const mockAbilities = [
  { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
  { name: 'lightning-rod', url: 'https://pokeapi.co/api/v2/ability/10/' },
  { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/19/' },
  { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/29/' }
]

describe('Find pokemon by name Use Case', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAbilitiesByNameUseCase,
        {
          provide: PokemonService,
          useValue: {
            getAbilitiesByPokemonName: jest.fn()
          }
        }
      ]
    }).compile()

    useCase = module.get(FindAbilitiesByNameUseCase)
    pokemonService = module.get(PokemonService)
  })

  it('Should be able return pokemon abilities order by name asc', async () => {
    jest
      .spyOn(pokemonService, 'getAbilitiesByPokemonName')
      .mockReturnValue(Promise.resolve({ abilities: mockAbilities }))
    const abilities = await useCase.execute('pikachu')

    expect(abilities).toStrictEqual([
      'chlorophyll',
      'lightning-rod',
      'overgrow',
      'static'
    ])
  })
})
