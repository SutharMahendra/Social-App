import React, { forwardRef, useId } from 'react'

const Input = forwardRef(
    function Input({
        label,
        type = 'text',
        className = '',
        ...props
    }, ref) {

        const id = useId()
        return (
            <div>
                {label &&
                    <label
                        className='inline-block mb-1 pl-1'
                        htmlFor={id}
                    >
                        {label}
                    </label>
                }
                <input
                    type={type}
                    className={`px-3 py-1 rounded-lg bg-white  outline-none focus:bg-gray-500 focus:text-white duration-200 border border-gray-200 w-full ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    })

export default Input
