import { Module } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Module({
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}