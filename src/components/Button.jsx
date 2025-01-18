import test from 'node:test'
import React from 'react'

// this is common purpose button
// if we required button then we can not create button manually 
// we simple take btn from here


function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    // most of the case we declare default value for class name as emty. because if programer not set any class then emty class considred
    className = '',
    // if any attribute miss by us. then by default we take it by spreading it
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4, py-2 rounded-lg ${bgColor} ${className} ${textColor} `}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
