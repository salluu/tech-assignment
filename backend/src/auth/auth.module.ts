import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../users/user.model';
import { JwtStrategy } from './strategies/jwt.strategy'; 
import { JwtAuthGuard } from './guards/jwt-auth.guard'; 

@Module({
  imports: [
    ConfigModule, // Import ConfigModule to access environment variables
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '1h') }, // Default to '1h' if not set
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // Add JwtStrategy and JwtAuthGuard to providers
  controllers: [AuthController],
})
export class AuthModule {}
