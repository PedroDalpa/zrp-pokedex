import { Injectable, HttpException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'

type PokeApiResponse = {
  abilities: Ability[]
}

type Ability = {
  ability: { name: string }
}

@Injectable()
export class PokeApiService {
  constructor(private readonly httpService: HttpService) {}

  async getAbilitiesByPokemonName(name: string): Promise<PokeApiResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<PokeApiResponse>(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
      )

      return { abilities: data.abilities }
    } catch (error: unknown) {
      console.error(error)

      if (error instanceof AxiosError) {
        throw new HttpException('Failed to fetch abilities', 500)
      }

      throw new HttpException('Unexpected error occurred', 500)
    }
  }
}
