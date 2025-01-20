import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authService from '../Appwrite/Auth';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../Feature/AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Logo, Input } from './index';

function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            setError('');
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message || 'Something went wrong, please try again!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                {/* Logo Section */}
                <div className="mb-6 flex justify-center">
                    <span className="inline-block max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="font-medium text-primary hover:underline hover:text-primary-dark"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Error Message */}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {/* Login Form */}
                <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-6">
                    {/* Email Input */}
                    <div>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Invalid email address',
                                },
                            })}
                            autoComplete='email'
                        />
                        {error.email && (
                            <p className="text-red-500 text-sm mt-1">{error.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            autoComplete='current-password'
                        />
                        {error.password && (
                            <p className="text-red-500 text-sm mt-1">{error.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
