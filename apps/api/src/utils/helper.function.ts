import { InternalServerErrorException } from "@nestjs/common";
import { User } from "@prisma/client";
import * as argon2 from 'argon2';

export function payloadExtractor(user: User): GenerateJwtPayload {
    const payload = { id: user.id, email: user.email, role: user.role };
    return payload;
}

export async function hashTokenGenerator(token: string): Promise<string> {
    try {
        return await argon2.hash(token);
    } catch (err) {
        throw new InternalServerErrorException('Could not generate hashed refresh token');
    }
}


