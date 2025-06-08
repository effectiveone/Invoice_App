import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(data: { mail: string; username: string; password: string }) {
    const { mail, username, password } = data;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ mail });
    if (existingUser) {
      throw new ConflictException('Użytkownik z tym emailem już istnieje');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new this.userModel({
      mail,
      username,
      password: hashedPassword,
    });

    await user.save();

    return {
      message: 'Użytkownik został utworzony pomyślnie',
      userId: user._id,
    };
  }

  async login(data: { mail: string; password: string }) {
    const { mail, password } = data;

    // Find user
    const user = await this.userModel.findOne({ mail });
    if (!user) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    // Generate JWT token
    const payload = { userId: user._id, mail: user.mail };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user._id,
        mail: user.mail,
        username: user.username,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  async getUser(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new UnauthorizedException('Użytkownik nie znaleziony');
    }

    return {
      id: user._id,
      mail: user.mail,
      username: user.username,
    };
  }
}
