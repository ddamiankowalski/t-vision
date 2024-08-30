import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateJobRequestDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  packageName: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['JOB_START', 'JOB_END'])
  requestType: 'JOB_START' | 'JOB_END';
}
