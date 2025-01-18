import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import authService from '../Appwrite/Auth';
import { Button, Logo, Input } from './index'


function SignUp() {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const signUp = async (data) => {
        setError('')
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                navigate('/login')
            }
        } catch (error) {
            setError(error.message || 'Something went wrong. Please try again.')
        }

    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/50'>
                {/*it's  logo section */}
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>

            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Create a New Account</h2>
            {/* it ask you to have account or not (if have then login) */}
            <p>
                Already have an account?{' '}
                <Link
                    to='/login'
                    className='font-medium text-primary transition-all duration-200 hover:underline hover:text-xl'
                >
                    Login
                </Link>
            </p>
            {/* this type of all syntax is for error handling  */}
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            {/* form for login is start form below */}
            <form onSubmit={handleSubmit(signUp)}>
                <div className='space-y-5'>

                    {/* name input section */}
                    <Input
                        label=' Full Name:'
                        type='text'
                        placeholder='enter you name'
                        {...register('name', {
                            required: 'name is required'
                        })}
                    />
                    {error.name && <p className='text-red-600 mt-8 text-center'>{error.name.message}</p>}

                    {/* email section  */}
                    <Input
                        label='email:'
                        placeholder='enter email'
                        type='email'
                        {...register('email', {
                            required: 'email is requied',
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    {error.email && <p className='text-red-600 mt-8 text-center'>{error.email.message}</p>}

                    {/* password section */}
                    <Input
                        label='password:'
                        type='password'
                        placeholder='enter password'
                        {...register('password', {
                            required: 'password is required'
                        })}
                    />
                    {error.password && <p className='text-red-600 mt-8 text-center'>{error.password.message}</p>}

                    <Button
                        type='submit'
                        value='Sign Up'
                        className='w-full'
                    />

                </div>
            </form>
        </div>
    )
}

export default SignUp
