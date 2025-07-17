
export type JwtPayload = {
    id: number,
    access_token: string,
    refresh_token: string
}

export type User = {
    id: number;
    name: string;
    email: string;
    agreeToTerms: boolean;
    bio: string | null;
    avatar: string | null;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    comments?: UserComment[]; // Optional depending on whether you include relations
    likes?: Like[];       // Note: Field is "Like" in schema but "likes" might be more conventional
    posts?: Post[];       // Optional depending on whether you include relations
    role: Role.USER | Role.ADMIN; // Or you could keep it as Role if you define the enum
} | null;

// You might also want these related types:
type UserComment = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
    postId: number;
    authorId: number;
};

type Like = {
    id: number;
    postId: number;
    authorId: number;
};

type Post = {
    id: number;
    slug: string;
    title: string;
    content: string;
    thumbnail: string | null;
    published: boolean;
    authorId: number;
};

// If you want to explicitly type the Role enum:
enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}