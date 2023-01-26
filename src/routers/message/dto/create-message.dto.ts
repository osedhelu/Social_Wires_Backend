import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  content: string;
}
