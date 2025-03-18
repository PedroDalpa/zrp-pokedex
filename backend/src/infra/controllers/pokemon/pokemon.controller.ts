import { Controller, Inject, Get, Param } from '@nestjs/common'
import { FindAbilitiesByNameUseCase } from '@modules/pokemons/useCases/findAbilitiesByName/FindAbilitiesByNameUseCase'

@Controller('api')
export class DefaultController {
  constructor(
    @Inject(FindAbilitiesByNameUseCase)
    private readonly findAbilitiesByNameUseCase: FindAbilitiesByNameUseCase
  ) {}

  @Get('pokemons/:poke_name')
  async defaultByUser(@Param('poke_name') name: string) {
    try {
      const abilities = await this.findAbilitiesByNameUseCase.execute(name)

      return { success: true, data: abilities }
    } catch (error: any) {
      return { success: false, message: (error as Error).message }
    }
  }
}
