import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateTestStartRequestDto {
  @IsString()
  @IsNotEmpty()
  packageName: string;

  @IsString()
  runId: string;
}

export class CreateTestEndRequestDto {
  @IsString()
  @IsNotEmpty()
  packageName: string;

  @IsString()
  runId: string;

  @IsString()
  @IsIn(['SUCCESS', 'FAILURE'])
  status: 'SUCCESS' | 'FAILURE';
}
