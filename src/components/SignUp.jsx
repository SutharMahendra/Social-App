import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import authService from '../Appwrite/Auth';
import { Button, Logo, Input } from './index';

function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const signUp = async (data) => {
        setError('');
        try {
            console.log('before creating account')
            const userData = await authService.createAccount(data);
            console.log('after creating account')
            if (userData) {
                navigate('/');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong. Please try again.');
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
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Create a New Account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:underline hover:text-primary-dark"
                    >
                        Login
                    </Link>
                </p>

                {/* Error Message */}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                {/* Sign-Up Form */}
                <form onSubmit={handleSubmit(signUp)} className="mt-6 space-y-6">
                    {/* Full Name Input */}
                    <div>
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {error.name && (
                            <p className="text-red-500 text-sm mt-1">{error.name.message}</p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be valid',
                                },
                            })}
                        />
                        {error.email && (
                            <p className="text-red-500 text-sm mt-1">{error.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            autoComplete='new-password'
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
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
