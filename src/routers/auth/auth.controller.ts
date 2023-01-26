import { GetUser } from "@/common/decorator/get-user.decorator";
import { AccessTokenGuard, RefreshTokenGuard } from "@/common/guards";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";
import { signInDto, signUpDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "SignUp",
    description: `adicional debe manejar la columna created_at a nivel de base de datos de tipo timestamp ,
en lo posible con zona horaria timestamptz la cual al momento de crear un registro guarde
la fecha exacta en que fue registrado. Esto para todas las entidades `,
  })
  @Post("signup")
  async singup(@Body() createMessageDto: signUpDto) {
    try {
      return await this.authService.signUp(createMessageDto);
    } catch (err) {
      switch (err.code) {
        case "P2002":
          throw new BadRequestException("Usuario no encontrado");

        default:
          break;
      }
    }
  }

  @ApiOperation({
    summary: "SignIn",
    description: `se debe manejar un token de autorizacion para los demas endpoints, el cual debe tener un
tiempo de expiracion definido y debe ser pasada como bearer token autorization en cada
peticion `,
  })
  @Post("signin")
  singin(@Body() createMessageDto: signInDto) {
    return this.authService.signIn(createMessageDto);
  }
  @ApiOperation({
    summary: "refresh",
    description: `Este enpoint nos permite regenerar el access token`,
  })
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("refresh")
  refreshTokens(@GetUser() user: User) {
    const userId = user.id;
    const refreshToken = user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
  @ApiOperation({
    summary: "refresh",
    description: `Elimina la relacion del token en la base de datos del tabla user`,
  })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("logout")
  logout(@GetUser() user: User) {
    this.authService.logout(user.id);
  }
}
