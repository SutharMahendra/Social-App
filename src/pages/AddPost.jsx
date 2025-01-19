import React from 'react'
import { PostForm } from '../components/PostForm/PostForm'
import { Container } from '../components'


function AddPost() {
    return (
        <div className='py-8'>
            <Container>

                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
