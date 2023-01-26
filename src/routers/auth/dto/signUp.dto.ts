import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class signUpDto {
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsNotEmpty()
  @IsString({})
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must have a Uppercase, lowercase letter and a number",
  })
  password: string;
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsNotEmpty()
  @IsString({})
  @MinLength(6)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message:
      "The username must only have upper and lower case letters and numbers",
  })
  username: string;
  @ApiProperty({
    required: true,
    default: "",
  })
  @IsString({})
  @IsNotEmpty()
  fullname: string;
}
