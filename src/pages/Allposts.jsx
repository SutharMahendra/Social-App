import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import dbservice from '../Appwrite/DB';

function Allposts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('Fetching posts...');
                const dbPosts = await dbservice.getPosts([]);
                if (dbPosts) {
                    console.log("Fetched posts:", dbPosts);
                    setPosts(dbPosts.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="py-8 min-h-screen bg-gray-100">
            <Container>
                {/* Conditional rendering for empty posts */}
                {posts.length === 0 ? (
                    <div className="text-center mt-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            No Posts Found
                        </h1>
                        <p className="text-gray-600">
                            Check back later to view new posts.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                            All Posts
                        </h1>
                        <div className="flex flex-wrap gap-6">
                            {posts.map((post) => (
                                <div
                                    key={post.$id}
                                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                >
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Allposts;
