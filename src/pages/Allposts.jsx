import React, { useEffect, useState, useRef } from 'react';
import { Container, PostCard } from '../components';
import dbservice from '../Appwrite/DB';

function Allposts() {
    const [posts, setPosts] = useState([]);
    const scrollRef = useRef(null);

    const POST_HEIGHT = 450; // Post height
    const GAP = 32;           // Gap between posts

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

    const scrollUp = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: -(POST_HEIGHT + GAP),
                behavior: 'smooth',
            });
        }
    };

    const scrollDown = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: POST_HEIGHT + GAP,
                behavior: 'smooth',
            });
        }
    };

    // Handle Keyboard Arrows
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollUp();
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollDown();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="py-8 min-h-screen bg-gray-100">
            <Container>
                {posts.length === 0 ? (
                    <div className="text-center mt-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            No Posts Found
                        </h1>
                        <p className="text-gray-600">Check back later to view new posts.</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                            All Posts
                        </h1>

                        {/* Scrollable Section */}
                        <div className="relative h-[600px] overflow-hidden">

                            {/* Up Button */}
                            <button
                                className="absolute left-1/2 -translate-x-1/2 top-2 transform bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 z-10"
                                onClick={scrollUp}
                            >
                                ↑
                            </button>

                            {/* Posts Wrapper */}
                            <div
                                ref={scrollRef}
                                className="flex flex-col items-center gap-8 py-20 px-2 overflow-y-scroll scrollbar-hide scroll-smooth h-full"
                            >
                                {posts.map((post) => (
                                    <div
                                        key={post.$id}
                                        className="w-[300px] h-[450px] flex-shrink-0 transition-all duration-300 mx-auto"
                                    >
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>

                            {/* Down Button */}
                            <button
                                className="absolute left-1/2 -translate-x-1/2 bottom-2 transform bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-700 z-10"
                                onClick={scrollDown}
                            >
                                ↓
                            </button>

                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Allposts;
