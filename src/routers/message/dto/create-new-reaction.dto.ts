import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class CreateNewReactionDto {
  @IsString()
  @ApiProperty({
    default: "😀",
  })
  reaction: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    default: "",
    required: false,
    readOnly: true,
  })
  userId?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    default: "",
    required: false,
    readOnly: true,
  })
  comment?: string;
}
