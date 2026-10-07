require('dotenv');
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { neonDatabase } from './providers/database/config/neon.db';
import { ConfigModule } from '@nestjs/config';
import { BedModule } from './app/beds/bed.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env']
    }),
    TypeOrmModule.forRoot({
      ...neonDatabase,
      autoLoadEntities: true
    }),
    UserModule,
    BedModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
