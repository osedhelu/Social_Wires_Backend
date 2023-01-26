import { PrismaService } from "@/common/prisma.service";
import { Injectable } from "@nestjs/common";
import { Post, Prisma } from "@prisma/client";
import { CreateNewReactionDto } from "./dto/create-new-reaction.dto";

export type statuUpdate = "REACTION" | "COMMENT";
@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: Prisma.PostCreateInput, authorId: string) {
    console.log(
      "TCL: MessageService -> create -> createMessageDto",
      createMessageDto
    );
    return await this.prisma.post.create({
      data: {
        text: createMessageDto.text,
        title: createMessageDto.title,
        authorId: authorId,
      },
      select: {
        id: true,
        authorId: true,
        title: true,
        text: true,
        comments: {
          select: {
            authorId: true,
            comment: true,
          },
        },
        reactions: {
          select: {
            reaction: true,
            authorId: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    return await this.prisma.post.findMany({
      ...params,
      select: {
        id: true,
        authorId: true,
        title: true,
        text: true,
        comments: {
          select: {
            authorId: true,
            comment: true,
          },
        },
        reactions: {
          select: {
            reaction: true,
            authorId: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async remove(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.delete({
      where,
    });
  }
  async update(
    id: number,
    updateMessageDto: CreateNewReactionDto,
    stateUpdate: statuUpdate
  ) {
    let reactions = {};
    let comments = {};
    switch (stateUpdate) {
      case "REACTION":
        reactions = {
          create: {
            reaction: updateMessageDto.reaction,
            authorId: updateMessageDto.userId,
          },
        };
        break;
      case "COMMENT":
        comments = {
          create: {
            authorId: updateMessageDto.userId,
            comment: updateMessageDto.comment,
          },
        };
        break;
    }
    return this.prisma.post.update({
      data: {
        reactions,
        comments,
      },
      where: {
        id,
      },
    });
  }

  getEmogiCode(emoji: String) {
    return "U+" + emoji.codePointAt(0).toString(16).toUpperCase();
  }
}
