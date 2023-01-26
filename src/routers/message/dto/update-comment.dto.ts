import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateNewReactionDto } from "./create-new-reaction.dto";

export class UpdateMessageDto extends PartialType(CreateNewReactionDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    default: "",
    required: false,
    readOnly: true,
  })
  reaction?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    default: "",
    required: false,
    readOnly: false,
  })
  comment?: string;
}
