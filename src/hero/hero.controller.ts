import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  Header,
  Redirect,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get('index')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  index(@Res() response) {
    response.json(this.heroService.findAll());
  }

  @Get('detail/:id')
  show(@Param('id') id: number) {
    const hero = this.heroService.findAll().filter((hero) => {
      return hero.id == id;
    });
    return hero[0];
  }

  @Get('create')
  create(@Res({ passthrough: true }) response): string {
    response.cookie('name', 'baledemia');
    return 'Hero Create';
  }

  @Post('store')
  store(
    @Req() request,
    @Body() createHeroDto: CreateHeroDto,
    @Res({ passthrough: true }) response,
  ) {
    try {
      // const { id, name, type, gambar } = request.body;
      // heroes.push({
      //   id,
      //   name,
      //   type,
      //   gambar,
      // });

      // return heroes;
      this.heroService.create(createHeroDto);
      return this.heroService.findAll();
    } catch (error) {
      response.status(500).json({ message: error });
    }
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateHeroDto: UpdateHeroDto) {
    this.heroService.findAll().filter((hero) => {
      if (hero.id == id) {
        hero.name = updateHeroDto.name;
        hero.type = updateHeroDto.type;
      }
    });
    return this.heroService.findAll();
  }

  @Delete('destroy/:id')
  destroy(@Param('id') id: number) {
    const hero = this.heroService.findAll().filter((hero) => {
      return hero.id != id;
    });
    return hero[0];
  }

  @Get('welcome')
  @Redirect('https://docs.nestjs.com')
  hello() {
    return 'welcome';
  }
}
