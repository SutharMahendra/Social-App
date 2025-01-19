import React from 'react'
import dbservice from '../Appwrite/DB'
import { Container, PostCard } from '../components'

function Home() {

    const [posts, setposts] = useState([])

    useEffect(() => {
        dbservice.getPosts([])
            .then((dbposts) => {
                if (dbposts) {
                    setposts(dbposts.documents)
                }
            })

    }, [])


    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div>
                        <h1>
                            login to read posts
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }
    else {
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
}

export default Home
