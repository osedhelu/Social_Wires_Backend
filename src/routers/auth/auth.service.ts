import { PrismaService } from "@/common/prisma.service";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { signInDto, signUpDto } from "./dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async signUp(createUserDto: signUpDto): Promise<any> {
    let userValidate = await Prisma.validator<Prisma.UserCreateInput>()({
      email: createUserDto.email,
      password: this.hashData(createUserDto.password),
      username: createUserDto.username,
      fullname: createUserDto.fullname,
    });
    const user = await this.prisma.user.create({
      data: userValidate,
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const token = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, token.refreshToken);

    return {
      ...user,
    };
  }
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied");
    const refreshTokenMatches = bcrypt.compareSync(
      refreshToken,
      user.refreshToken
    );
    if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async signIn(data: signInDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (!user) throw new BadRequestException("User does not exist");
    const passwordMatches = bcrypt.compareSync(data.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException("Password is incorrect");
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
      },
      select: {
        refreshToken: true,
        id: true,
      },
    });
  }

  hashData(data: string): string {
    return bcrypt.hashSync(data, 10);
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>("jwt_access_secret"),
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>("jwt_refresh_secret"),
          expiresIn: "7d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
