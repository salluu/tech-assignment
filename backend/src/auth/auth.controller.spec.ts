// src/auth/auth.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn(),
    login: jest.fn(),
    refreshAccessToken: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
    send: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up a user and return success message', async () => {
    const signupDto: SignupDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    mockAuthService.signup.mockResolvedValue({ message: 'User registered successfully' });

    const result = await authController.signup(signupDto);

    expect(result.message).toEqual('User registered successfully');
    expect(mockAuthService.signup).toHaveBeenCalledWith(signupDto);
  });

  it('should login a user, set cookie, and return access token', async () => {
    const loginDto: LoginDto = {
      email: 'john@example.com',
      password: 'password123',
    };

    mockAuthService.login.mockResolvedValue({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    });

    await authController.login(loginDto, mockResponse);

    expect(mockResponse.cookie).toHaveBeenCalledWith(
      'refreshToken',
      'mockRefreshToken',
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: expect.any(Number),
      }),
    );
    expect(mockResponse.send).toHaveBeenCalledWith({ accessToken: 'mockAccessToken' });
  });

  it('should throw UnauthorizedException if no refresh token is found', async () => {
    const mockRequest = { cookies: {} } as Partial<Request> as Request;

    await expect(authController.refresh(mockRequest, mockResponse)).rejects.toThrowError(
      UnauthorizedException,
    );
  });
});
