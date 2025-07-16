import { LoginData, SignupData, VerifyLoginEmail, VerifySignupEmail } from "@/types/auth";


export const singupApi = async (data: VerifySignupEmail) => {
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `HTTP error! status: ${response.status}` };
            }
            throw new Error(errorData.message || 'Signup failed');
        }

        return await response.json();
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }

}
export const loginApi = async (data: VerifyLoginEmail) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            body: JSON.stringify(data),
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
export const verifySignupOtp = async (data: SignupData) => {
    try {
        const response = await fetch('http://localhost:8080/auth/signup/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            credentials: 'include',
            body: JSON.stringify(data),
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

