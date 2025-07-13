import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(configService: ConfigService) {
        const GOOGLE_CLIENT_ID = configService.get<string>('GOOGLE_CLIENT_ID');
        if (!GOOGLE_CLIENT_ID) throw new NotFoundException('GOOGLE_CLIENT_ID not found in .env');

        const GOOGLE_CLIENT_SECRET = configService.get<string>('GOOGLE_CLIENT_SECRET');
        if (!GOOGLE_CLIENT_SECRET) throw new NotFoundException('GOOGLE_CLIENT_SECRET not found in .env');

        const GOOGLE_CALLBACK_URL = configService.get<string>('GOOGLE_CALLBACK_URL');
        if (!GOOGLE_CALLBACK_URL) throw new NotFoundException('GOOGLE_CALLBACK_URL not found in .env');

        super({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    }

    validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): void {
        try {
            const { name, emails, photos } = profile;

            const user = {
                email: emails?.[0]?.value,
                name: `${name?.givenName} ${name?.familyName}`,
                avatar: photos?.[0]?.value,
            };

            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}
