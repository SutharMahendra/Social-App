import React from 'react'
import image from '../image/image-removebg-preview.png'


// it's for logo icon and we pass width props(width)
function Logo({ width = '100px' }) {
    return (
        <div>
            <img src={image} className='w-20 h-16' alt="logo image" />
        </div>
    )
}

export default Logo