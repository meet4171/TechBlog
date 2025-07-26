import { LoginData, SendOtp, SignupData, VerifyLoginEmail, } from "@/types/auth";


export const singupApi = async (data: SendOtp) => {
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
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
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
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error('Login error:', err);
        throw err;
    }
};

export const authenticateUser = async () => {
    const res = await fetch('http://localhost:8080/auth/me', {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('kindly login');
    }

    return await res.json();
};

export const logout = async () => {
    try {
        await fetch('http://localhost:8080/auth/signout', {
            method: 'POST',
            credentials: 'include',

        });
    } catch (err) {
        throw new Error('Logout failed')
    }
};

