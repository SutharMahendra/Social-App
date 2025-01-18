import React from 'react'
import appwriteService from '../Appwrite/Bucket'
import { Link } from 'react-router-dom'

// here $id is appwrite props and it's syntax so that why we write $id instead of id
// and this id is for whole card
function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div>

                    {/* here we requied featured image url and that url we get from appwriteService */}
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className='rounded-xl' />
                </div>
                <h2
                    className='text-xl font-bold'
                >
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard