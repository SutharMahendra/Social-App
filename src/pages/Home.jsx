import dbservice from '../Appwrite/DB';
import { Container, PostCard } from '../components';
import { useState, useEffect } from 'react';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const dbPosts = await dbservice.getPosts([]);
                if (dbPosts) {
                    setPosts(dbPosts.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">
                            Login to read posts
                        </h1>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="py-8">
                <Container>
                    <div className="flex flex-wrap gap-4">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-full md:w-1/2 lg:w-1/3">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;
