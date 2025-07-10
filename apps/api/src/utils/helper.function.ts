import { User } from "@prisma/client"


export function payloadExtractor(user: User): GenerateJwtPayload {
    const payload = { id: user.id, email: user.email, role: user.role };
    return payload;
}