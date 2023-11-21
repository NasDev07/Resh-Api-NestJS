import { IsNumber, IsNotEmpty, IsAlpha, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsString()
  type: string;

  @IsString()
  gambar: string;
}
