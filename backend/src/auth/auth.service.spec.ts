// src/auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  // Mock the user model with methods directly defined
  const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(() => 'mockAccessToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully sign up a user', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    mockUserModel.findOne.mockResolvedValue(null); // No existing user
    mockUserModel.create.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });

    const signupDto: SignupDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    const result = await authService.signup(signupDto);

    expect(result.message).toEqual('User registered successfully');
    expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: signupDto.email });
    expect(mockUserModel.create).toHaveBeenCalledWith({
      name: signupDto.name,
      email: signupDto.email,
      password: 'hashedPassword',
    });
  });

  it('should throw error if user already exists during signup', async () => {
    mockUserModel.findOne.mockResolvedValue({ email: 'john@example.com' });

    const signupDto: SignupDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    await expect(authService.signup(signupDto)).rejects.toThrowError(BadRequestException);
  });

  it('should successfully login a user', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    mockUserModel.findOne.mockResolvedValue({
      _id: 'mockUserId', // Add this to avoid the undefined error
      email: 'john@example.com',
      password: hashedPassword,
    });
  
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Mock bcrypt.compare to return true
  
    const loginDto: LoginDto = {
      email: 'john@example.com',
      password: 'password123',
    };
  
    const result = await authService.login(loginDto);
  
    expect(result.accessToken).toEqual('mockAccessToken');
    expect(mockJwtService.sign).toHaveBeenCalled();
  });

  it('should throw error if login credentials are invalid', async () => {
    mockUserModel.findOne.mockResolvedValue(null);

    const loginDto: LoginDto = {
      email: 'john@example.com',
      password: 'wrongpassword',
    };

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Mock bcrypt.compare to return false for invalid password

    await expect(authService.login(loginDto)).rejects.toThrowError(UnauthorizedException);
  });
});
