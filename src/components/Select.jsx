import React, { forwardRef, useId } from 'react'

function Select({
    options = [],
    label,
    className = '',
    ...props

}, ref) {
    // here id is important for binding label and option
    const id = useId()
    return (
        <div>
            {label && <label htmlFor={id}>
                {label}
            </label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {/*  here condition syntax is used because if we not have any type of option then error can not occor */}
                {options?.map((option) => {
                    <option key={option} value={option}>
                        {option}
                    </option>
                })}

            </select>
        </div>
    )
}

export default forwardRef(Select)