import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbservice from '../Appwrite/DB'
import { Container, PostForm } from '../components'

function EditPost() {

    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            dbservice.getPost(slug)
                .then((dbpost) => {
                    if (dbpost) {
                        setPost(dbpost)
                    }
                })
        } else {
            navigate('/')
        }


    }, [slug, navigate])



    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
