declare global {
    type GenerateJwtPayload = {
        id: number;
        email: string;
        role: string;
    };


    type LoginResTokens = {
        id: number;
        access_token: string;
        refresh_token: string;
    };

    type RefreshAceessToken = {
        id: number,
        email: string,
        role: string,


    }
}

export { };
