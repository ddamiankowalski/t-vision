import { IsString, IsNotEmpty } from 'class-validator';

export class CreateJobRequestDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  packageName: string;
}
