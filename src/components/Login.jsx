import React from 'react'
import { useForm } from 'react-hook-form'

function Login() {
    // here handlesubmit is key word for the react hook form so we can not use it directly submit 
    // we make other fucntion (login) and then pass that function as parameter in handlesubmit
    const { register, handleSubmit } = useForm()

    const Login = async (data) => {

    }

    return (
        <div>

        </div>
    )
}

export default Login
