import { useState, useEffect } from 'react';
import dbservice from '../Appwrite/DB';
import { Link, useNavigate, useParams } from 'react-router-dom';
import bucketService from '../Appwrite/Bucket';
import { Button, Container } from '../components';
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
                const dbpost = await dbservice.getPost(slug)
                if (dbpost) {
                    const featuredImage = await bucketService.getFilePreview(dbpost.featuredImage)
                    setPost({ ...dbpost, featuredImage })
                } else {
                    navigate('/')
                }
            }
            catch (error) {
                console.error("Error fetching post or preview:", error)
            }
        }

        fetchPost()
    }, [slug, navigate]);

    const deletePost = () => {
        dbservice.deletePost(post.$id).then(() => {
            bucketService.deleteFile(post.featuredImage);
            navigate('/');
        });
    };

    return post ? (
        <div className="py-8 bg-gray-100 min-h-screen">
            <Container>
                {/* Image Section */}
                <div className="w-full flex justify-center mb-8 relative border rounded-xl p-4 bg-white shadow-lg">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className=" justify-center rounded-xl max-h-96 object-contain"

                    />
                </div>

                {/* Author Actions */}
                {isAuthor && (
                    <div className="flex justify-end space-x-4 mb-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button
                                bgColor="bg-green-500 hover:bg-green-600"
                                className="text-white px-4 py-2 rounded-md"
                            >
                                Edit
                            </Button>
                        </Link>
                        <Button
                            bgColor="bg-red-500 hover:bg-red-600"
                            className="text-white px-4 py-2 rounded-md"
                            onClick={deletePost}
                        >
                            Delete
                        </Button>
                    </div>
                )}

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">{post.title}</h1>
                </div>

                {/* Post Content */}
                <div className="prose max-w-none bg-white p-6 rounded-lg shadow-lg">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;
