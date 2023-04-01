import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon2 from 'argon2';

@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService) {

    }

    async register(authDTO: AuthDTO) {
        const hashedPassword = await argon2.hash(authDTO.password);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                    firstName: '',
                    lastName: '',
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
            })
            return user;
        }
        catch (error) {
            if (error.code == 'P2002') {
                // throw new ForbiddenException(error.message);
                throw new ForbiddenException('Error in creadentials');
            }
        }
    }

    async login(authDTO: AuthDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        })
        if (!user) {
            throw new ForbiddenException(
                'User not found'
            )
        }
        return {
            message: "this is login"
        }
    }
}
