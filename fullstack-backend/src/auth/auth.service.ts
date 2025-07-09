import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Omit<User, 'password'>> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('The specified password does not match.');
    }
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      email: dto.email,
      password: hashed,
    });
    const saved = await this.userRepository.save(user);

    const { password, ...result } = saved;
    return result;
  }

  async login(dto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Email or password is incorrect');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '10m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email }
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
      const accessToken = await this.jwtService.signAsync({ sub: payload.sub, email: payload.email }, { expiresIn: '10m' });
      return { accessToken };
    } catch (e) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
