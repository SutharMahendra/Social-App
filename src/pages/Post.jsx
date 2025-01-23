import { useState, useEffect } from 'react';
import dbservice from '../Appwrite/DB';
import { Link, useNavigate, useParams } from 'react-router-dom';
import bucketService from '../Appwrite/Bucket';
import { Button } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const dbpost = await dbservice.getPost(slug);
                if (dbpost) {
                    const featuredImage = await bucketService.getFilePreview(dbpost.featuredImage);
                    setPost({ ...dbpost, featuredImage });
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching post or preview:', error);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = () => {
        dbservice.deletePost(post.$id).then(() => {
            bucketService.deleteFile(post.featuredImage);
            navigate('/');
        });
    };

    return post ? (
        <div className="flex justify-center items-center py-12 bg-gradient-to-b from-gray-100 to-gray-200 max-h-screen">
            {/* Card Wrapper */}
            <div
                className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 border 
                transition-all duration-500 hover:shadow-2xl transform hover:scale-105"
            >
                {/* Image Section */}
                <div
                    className="w-full h-96 flex justify-center mb-8 rounded-xl overflow-hidden 
                    shadow-md transition-transform transform hover:scale-105"
                >
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="rounded-xl max-h-96 object-contain mb-7 shadow-xl"
                    />
                </div>

                {/* Author Actions */}
                {isAuthor && (
                    <div className="flex justify-end space-x-4 mb-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button
                                bgColor="bg-green-500 hover:bg-green-600"
                                className="text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
                            >
                                Edit
                            </Button>
                        </Link>
                        <Button
                            bgColor="bg-red-500 hover:bg-red-600"
                            className="text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
                            onClick={deletePost}
                        >
                            Delete
                        </Button>
                    </div>
                )}

                {/* Post Title */}
                <div
                    className="w-full text-center mb-6 border-b-2 pb-4
                    transition-transform transform hover:scale-105"
                >
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
                        {post.title}
                    </h1>
                </div>

                {/* Post Content */}
                <div
                    className="prose max-w-none bg-gray-50 p-6 rounded-lg shadow-lg border
                    animate-slideIn transition-all duration-700 hover:shadow-xl"
                >
                    <h2 className="text-center text-2xl font-semibold mb-4 text-gray-700">
                        ~: Content :~
                    </h2>
                    <div className="text-justify text-gray-600">
                        {parse(post.content)}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default Post;
