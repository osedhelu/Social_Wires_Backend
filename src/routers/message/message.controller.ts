import { GetUser } from "@/common/decorator/get-user.decorator";
import { AccessTokenGuard } from "@/common/guards";
import { PaginationQueryDto } from "@/interface";
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { CreateMessageDto } from "./dto/create-message.dto";
import { CreateNewReactionDto } from "./dto/create-new-reaction.dto";
import { UpdateMessageDto } from "./dto/update-comment.dto";
import { MessageService } from "./message.service";

@UseGuards(AccessTokenGuard)
@ApiBearerAuth("JWT-auth")
@ApiTags("message")
@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({
    summary: "Create Message",
    description:
      "se le pasara el id del usuario interceptando la petición , e inyectando el campo obtenido por medio del usuario autorizado para la petición ",
  })
  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: User
  ) {
    try {
      return await this.messageService.create(
        {
          text: createMessageDto.content,
          title: createMessageDto.title,
        },
        user.id
      );
    } catch (err) {
      throw new BadRequestException("Error al crear el usuario");
    }
  }
  @ApiOperation({
    summary: "Get all messages",
    description:
      "retorna un arreglo de todos los mensajes registrados en social wires",
  })
  @Get()
  findAll(@Query() params: PaginationQueryDto) {
    return this.messageService.findAll({
      take: params.limit,
      skip: params.offset,
    });
  }
  @ApiOperation({
    summary: "Get my messages",
    description:
      "retorna un arreglo de los mensajes enviados por el usuario autorizado",
  })
  @Get("/me")
  GetMyMessage(@Query() params: PaginationQueryDto, @GetUser() user: User) {
    return this.messageService.findAll({
      take: params.limit,
      skip: params.offset,
      where: {
        authorId: user.id,
      },
    });
  }

  @ApiOperation({
    summary: "Get only message by id",
    description: "retorna un mensaje encontrado por su id",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.messageService.post({ id: +id });
  }

  // @ApiOperation({
  //   summary: "Get only message by id",
  //   description: "retorna un mensaje encontrado por su id",
  // })
  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }
  @ApiOperation({
    summary: "Delete me message",
    description:
      "retornar un estado de eliminación solo se puede eliminar mensajes de propia autoria",
  })
  @Delete(":id")
  async remove(@Param("id") id: string, @GetUser() user: User) {
    const message = await this.messageService.post({ id: +id });
    if (user.id !== message.authorId) {
      throw new UnauthorizedException("Este mensaje no es de tu autoria");
    }
    await this.messageService.remove({ id: +id });
    return { delete: true, status: "OK" };
  }

  @ApiOperation({
    summary: "Create Reaction",
    description:
      "debe retornar el mensaje con la actulizacion del comentario no se puede hacer comentarios en mensajes de su propia autoria ",
  })
  @Patch("/reaction/:id")
  async update(
    @Param("id") id: string,
    @Body() updateMessageDto: CreateNewReactionDto,
    @GetUser() user: User
  ) {
    const message = await this.messageService.post({ id: +id });
    if (user.id === message.authorId) {
      throw new UnauthorizedException(
        "No puedes reaccionar a tus propios mensages"
      );
    }

    return this.messageService.update(
      +id,
      {
        reaction: this.messageService.getEmogiCode(updateMessageDto.reaction),
        userId: user.id,
      },
      "REACTION"
    );
  }

  @ApiOperation({
    summary: "Create Comment",
    description:
      "debe retornar el mensaje con la actulizacion del comentario no se puede hacer comentarios en mensajes de su propia autoria",
  })
  @Patch("/comment/:id")
  async updateComment(
    @Param("id") id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @GetUser() user: User
  ) {
    const message = await this.messageService.post({ id: +id });
    if (user.id === message.authorId) {
      throw new UnauthorizedException(
        "No puedes reaccionar a tus propios mensages"
      );
    }

    return this.messageService.update(
      +id,
      {
        reaction: "",
        comment: updateMessageDto.comment,
        userId: user.id,
      },
      "COMMENT"
    );
  }
}
