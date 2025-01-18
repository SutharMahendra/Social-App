import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import authService from '../Appwrite/Auth';
import Logo from './Logo';
import Input from './Input';
import Button from './Button';




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
            setError(error.message)
        }

    }

    return (
        <div>
            <div>
                <Logo width='100%' />

            </div>
            <h2>
                create new account
            </h2>
            <p>
                Do you have account ?
                <Link
                    to='/login'
                >
                    Login
                </Link>
            </p>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(signUp)}>
                <div>
                    <Input
                        label=' Full Name:'
                        type='text'
                        placeholder='enter you name'
                        {...register('name', {
                            required: true
                        })}
                    />

                    <Input
                        label='email:'
                        placeholder='enter email'
                        type='email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />

                    <Input
                        label='password:'
                        type='password'
                        placeholder='enter password'
                        {...register('password', {
                            required: true
                        })}
                    />

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
