import { LoginData } from "@/types/auth";

export const loginApi = async (email: string) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `HTTP error! status: ${response.status}` };
            }
            throw new Error(errorData.message || 'Login failed');
        }

        return await response.json();
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }
};
export const verifyLoginOtp = async (credentials: LoginData) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `HTTP error! status: ${response.status}` };
            }
            throw new Error(errorData.message || 'Login failed');
        }

        return await response.json();
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }
};

export const logout = async (accessToken: string) => {
    try {
        await fetch('http://localhost:8080/auth/signout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
    } catch (err) {
        throw new Error('Logout failed')
    }
};

