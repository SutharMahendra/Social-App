import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { login as authLogin, login } from '../Feature/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { Button, Logo, Input } from './index'


function Login() {
    // here handlesubmit is key word for the react hook form so we can not use it directly submit 
    // we make other fucntion (login) and then pass that function as parameter in handlesubmit
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (data) => {

        try {
            setError('')
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }

            }

        } catch (error) {
            setError(error.message || 'somthing went wront try again!!')
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/50'>
                {/*it's  logo section */}
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%' />
                </span>

            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            {/* it ask you to have account or not (if not then sign up) */}
            <p>
                Don't have account?{''}
                <Link
                    to='/signup'
                    className='font-medium text-primary transition-all duration-200 hover:underline hover:text-xl'
                >
                    Sign Up
                </Link>
            </p>
            {/* this type of all syntax is for error handling  */}
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            {/* form for login is start form below */}
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className='space-y-5'>
                    {/* Email input section */}
                    <Input
                        label='Email:'
                        placeholder='enter your email'
                        type='email'
                        {...register('email', {
                            required: 'email is required',
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Invalid email address",
                            }

                        })}
                    />
                    {error.email && <p className='text-red-600 mt-8 text-center'>{error.email.message}</p>}

                    {/* password input section */}
                    <Input
                        type='password'
                        label='Password:'
                        placeholder='Enter Password'
                        {...register('password', {
                            required: 'password is required'
                        })}
                    />
                    {error.password && <p className='text-red-600 mt-8 text-center'>{error.password.message}</p>}

                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Sign in
                    </Button>
                </div>


            </form>


        </div>
    )
}

export default Login
