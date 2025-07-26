
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import LoadingSvg from '@/components/LoadingSvg';
import { FieldErrors, useForm } from 'react-hook-form';
import { Password, SendOtp, SignupData, VerfiyOtp } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { singupApi, verifySignupOtp } from '@/lib/api/auth';
import { cn } from '@/lib/utils/cn.utility';
import { useAuth } from '@/app/contexts/AuthContext';
import { PasswordSchema, SendOtpSchema, VerifyOtpSchema } from '@/lib/zod/auth';
import z from 'zod';



const CombinedSignupForm = () => {

    const { setCurrentUser } = useAuth();

    const [otpSent, setOtpSent] = useState(false);
    const [otpExpiry, setOtpExpiry] = useState<number | null>(null);
    const [otpDuration, setOtpDuration] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState(false);
    type SignupMethod = 'default' | 'otp';
    const [signupMethod, setSignupMethod] = useState<SignupMethod>('default');
    const [showPassword, setShowPassword] = useState(false)

    const isOtpFlow = signupMethod === 'otp';

    const formSchema = useMemo(() => {
        if (isOtpFlow) {
            return otpSent ? VerifyOtpSchema : SendOtpSchema;
        }
        return PasswordSchema;
    }, [isOtpFlow, otpSent]);



    type FormData = z.infer<typeof PasswordSchema> & z.infer<typeof SendOtpSchema> & z.infer<typeof VerifyOtpSchema>;


    const {
        register,
        formState: { errors },
        setError,
        handleSubmit,
        clearErrors,
        resetField,
        reset,
        getValues
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onSubmit',
        defaultValues: useMemo(() => {
            return {
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                otp: '',
                agreeToTerms: false
            };
        }, [])
    });

    const onError = (errors: FieldErrors<SignupData>) => {
        console.log(errors);
    };


    const handleSendOtp = async (data: SendOtp) => {
        resetField('otp');
        setOtpSent(false);
        setTimeLeft(null);
        setOtpExpiry(null);
        setOtpDuration(null);
        setOtpError(null);
        clearErrors('otp');
        setLoading(true);
        try {
            const resp = await singupApi(data);
            const expiryTimestamp = Date.now() + resp.expiresAt;
            setOtpExpiry(expiryTimestamp);
            setOtpDuration(resp.expiresAt);
            setOtpSent(true);
            clearErrors('email');
        } catch (error: any) {
            console.error(error);
            setOtpSent(false);
            setOtpExpiry(null);
            setError('email', {
                type: 'manual',
                message: error.message || 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown) return;
        const email = getValues('email');
        const name = getValues('name');
        const agreeToTerms = getValues('agreeToTerms');

        if (!email || !name || !agreeToTerms) return;

        try {
            setResendCooldown(true);
            await handleSendOtp({ email, name, agreeToTerms });
        } finally {
            setTimeout(() => setResendCooldown(false), 40000);
        }
    };


    const handleVerifyOtp = async (data: VerfiyOtp) => {
        try {
            setLoading(true);
            const resp = await verifySignupOtp(data);
            console.log(resp);
            if (resp) {
                setCurrentUser(resp);
            }

            reset()
        } catch (error: any) {
            console.error(error);
            setOtpError(error.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Google login initiated');
    };

    const submitHandler = (data: FormData) => {
        if (signupMethod === 'otp') {
            return otpSent ? handleVerifyOtp(data as VerfiyOtp) : handleSendOtp(data as SendOtp);
        }
        return handleSignupWithPassword(data as Password);
    };


    const handleSignupWithPassword = (data: Password) => {

    }

    // Reset OTP state when expired
    const resetOtpState = useCallback(() => {
        setOtpSent(false);
        setOtpExpiry(null);
        setTimeLeft(null);
        resetField('otp');
        setOtpError(null);
    }, [resetField]);

    useEffect(() => {
        if (!otpExpiry || isNaN(otpExpiry)) return;

        let interval: NodeJS.Timeout = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((otpExpiry - now) / 1000));

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
                resetOtpState();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [otpExpiry, resetOtpState]);

    useEffect(() => {
        if (!otpSent) {
            clearErrors();
            setOtpError(null);
        }
    }, [otpSent, clearErrors]);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }, []);

    return (

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-card py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-border">
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() => setSignupMethod('default')}
                        className={cn("px-3 py-1 rounded", signupMethod === 'default' ? "bg-primary text-white" : "bg-muted")}
                    >
                        Password
                    </button>
                    <button
                        type="button"
                        onClick={() => setSignupMethod('otp')}
                        className={cn("px-3 py-1 rounded", signupMethod === 'otp' ? "bg-primary text-white" : "bg-muted")}
                    >
                        OTP
                    </button>

                </div>

                <form className="space-y-6"
                    noValidate
                    onSubmit={handleSubmit(submitHandler, onError)}


                >
                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                            Full Name
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <input
                                id="name"
                                {...register('name')}
                                type="text"
                                autoComplete="name"
                                className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring focus:ring-primary"
                                placeholder="FirstName LastName"
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name?.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground">
                            Email address
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <input
                                id="email"
                                {...register('email')}
                                type="email"
                                autoComplete="email"
                                disabled={otpSent && timeLeft !== null && timeLeft > 0}
                                className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-border'} rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring focus:ring-primary`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>



                    <div
                        className={cn(
                            'transition-all duration-500 ease-in-out overflow-visible',
                            {
                                // Show Password fields when signup method is default
                                'opacity-100 max-h-[500px] translate-y-0 pointer-events-auto':
                                    (signupMethod === 'default') ||
                                    (signupMethod === 'otp' && otpSent && timeLeft !== null && timeLeft > 0),
                                'opacity-0 max-h-0 -translate-y-2 pointer-events-none':
                                    (signupMethod === 'otp' && (!otpSent || timeLeft === null || timeLeft <= 0))
                            }
                        )}
                    >
                        {signupMethod === 'default' && (
                            <>
                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <input
                                            id="password"
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            className={`block w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-border'
                                                } rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring focus:ring-primary`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">{errors.password?.message}</p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="mt-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockKeyhole className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            {...register('confirmPassword')}
                                            type="password"
                                            autoComplete="new-password"
                                            className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-border'
                                                } rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring focus:ring-primary`}
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-xs text-red-500">{errors.confirmPassword?.message}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {signupMethod === 'otp' && otpSent && timeLeft !== null && timeLeft > 0 && (
                            <>
                                {/* OTP Field */}
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-foreground">
                                        Enter OTP
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <input
                                            id="otp"
                                            {...register('otp', {
                                                pattern: {
                                                    value: /^[0-9]{6}$/,
                                                    message: "OTP must be exactly 6 digits"
                                                }
                                            })}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            onKeyDown={(e) => {
                                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className={`block w-full pl-10 pr-3 py-2 border ${errors.otp ? 'border-red-500' : 'border-border'} rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring focus:ring-primary`}
                                            placeholder="Enter 6-digit OTP"
                                        />
                                    </div>
                                    {timeLeft && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            OTP expires in: {formatTime(timeLeft)}
                                        </p>
                                    )}
                                    {(errors.otp?.message || otpError) && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.otp?.message || otpError}
                                        </p>
                                    )}
                                    {otpSent && otpDuration && timeLeft !== null && timeLeft <= (otpDuration / 1000) * 0.3 && timeLeft > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={resendCooldown}
                                            className={cn("mt-2 text-sm hover:underline", {
                                                "text-gray-400 cursor-not-allowed": resendCooldown,
                                                "text-primary": !resendCooldown
                                            })}
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>



                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            {...register("agreeToTerms")}
                            className="mt-1 h-4 w-4 text-primary border-border rounded"
                        />
                        <label htmlFor="agreeToTerms" className="text-sm leading-tight text-foreground cursor-pointer">
                            I agree to the {" "}
                            <Link
                                href="/terms-privacy-policy"
                                className="text-primary underline underline-offset-2 hover:text-primary/80"
                            >
                                Terms and Privacy Policy
                            </Link>
                        </label>
                    </div>


                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md bg-btn-blue hover:bg-btn-blue-hover text-white text-sm font-medium focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primary transition"
                            disabled={loading}
                        >
                            {loading ? <LoadingSvg /> : (
                                <>
                                    {otpSent && timeLeft !== null && timeLeft > 0 ? 'Verify OTP' : signupMethod === 'otp' ? 'Send OTP' : 'Signup'}
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>




                </form>

                {/* Divider */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-border rounded-md bg-background text-sm text-muted-foreground hover:bg-accent transition"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>

                {/* Already have account */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:underline">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CombinedSignupForm;


