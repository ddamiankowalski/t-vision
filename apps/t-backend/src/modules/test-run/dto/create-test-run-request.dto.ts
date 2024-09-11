import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateTestRunRequestDto {
  @IsString()
  @IsNotEmpty()
  packageName: string;

  @IsString()
  runId: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['RUN_START', 'RUN_END'])
  requestType: 'RUN_START' | 'RUN_END';
}
