import { Injectable } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface';

@Injectable()
export class HeroService {
  private readonly heroes: Hero[] = [
    {
      id: 1,
      name: 'Aurora',
      type: 'Mage',
      gambar: 'aurora.jpg',
    },
    {
      id: 2,
      name: 'Zilong',
      type: 'Figjter',
      gambar: 'zilong.jpg',
    },
    {
      id: 3,
      name: 'Alucard',
      type: 'Assasin',
      gambar: 'alucard.jpg',
    },
  ];

  create(hero: Hero) {
    this.heroes.push(hero);
  }

  findAll(): Hero[] {
    return this.heroes;
  }
}
