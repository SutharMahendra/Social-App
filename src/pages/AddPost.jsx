import React from 'react';
import { PostForm } from '../components';
import { Container } from '../components';

function AddPost() {
    return (
        <div className="py-8 bg-gray-100 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Create a New Post
                    </h1>
                    <PostForm />
                </div>
            </Container>
        </div>
    );
}

export default AddPost;
