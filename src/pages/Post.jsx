import React from 'react'
import dbservice from '../Appwrite/DB'
import { Link, useNavigate, useParams } from 'react-router-dom'
import bucketService from '../Appwrite/Bucket'
import { Button, Container } from '../components'
import parse from 'html-react-parser'

function Post() {

    const [post, setpost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        dbservice.getPost(slug)
            .then((dbpost) => {
                if (dbpost) {
                    setpost(dbpost)
                }
                else {
                    navigate('/')
                }
            })
    }, [])

    const deletePost = () => {
        dbservice.deletePost(post.$id)
            .then((deletedPost) => {
                bucketService.deleteFile(post.featuredImage)
                navigate('/')
            })
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <div className='className="w-full flex justify-center mb-4 relative border rounded-xl p-2"'>
                    <img
                        src={bucketService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-xl' />
                </div>

                {

                }
            </Container>

            {/* if user have it own post then and then only user can edit or delete post*/}
            {isAuthor && (
                <div className='absolute right-6 top-6'>
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="mr-3">
                            Edit
                        </Button>

                    </Link>
                    <Button
                        bgColor='bg-red-500'
                        onClick={deletePost}
                    >
                        Delete
                    </Button>
                </div>
            )}

            {/* this section show title */}

            <div className='w-full mb-6'>
                <h1 className="text-2xl font-bold">{post.title}</h1>

            </div>

            {/* this section show content */}
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </div>
    ) : null
}

export default Post
