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
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      email: dto.email,
      password: hashed,
    });
    const saved = await this.userRepository.save(user);
    // Không trả về password
    const { password, ...result } = saved;
    return result;
  }

  async login(dto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '5m' });
    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email }
    };
  }
}
