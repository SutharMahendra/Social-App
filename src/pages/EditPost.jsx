import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dbservice from '../Appwrite/DB';
import { Container, PostForm } from '../components';

function EditPost() {
    const [post, setPost] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            dbservice.getPost(slug)
                .then((dbpost) => {
                    if (dbpost) {
                        setPost(dbpost);
                    }
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="py-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <PostForm post={post} />
            </div>
        </div>
    ) : null;
}

export default EditPost;
