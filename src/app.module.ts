import { Module } from "@nestjs/common";
import { RoutersModule } from "./routers/routers.module";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "@nestjs/config";
import { EnvConfigutation } from "./config/env.config";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigutation],
    }),
    RoutersModule,
    CommonModule,
  ],
})
export class AppModule {}
