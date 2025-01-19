import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import dbservice from '../Appwrite/DB'

function Allposts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        dbservice.getPosts([])
            .then((dbposts) => {
                if (dbposts) {
                    setPosts(dbposts.documents)
                }
            })
    })

    return (
        <div>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((index) => (
                        <div key={index.$id}>
                            <PostCard {...posts} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts
