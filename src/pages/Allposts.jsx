import React, { useEffect, useState, useRef } from 'react';
import { Container, PostCard } from '../components';
import dbservice from '../Appwrite/DB';

function Allposts() {
    const [posts, setPosts] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = useRef(null);

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

    const scrollLeft = () => {
        if (scrollRef.current) {
            const newScrollPosition = Math.max(scrollPosition - 1, 0);
            setScrollPosition(newScrollPosition);
            scrollRef.current.scrollTo({
                left: newScrollPosition * scrollRef.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current && posts.length) {
            const newScrollPosition = Math.min(scrollPosition + 1, posts.length - 3);
            setScrollPosition(newScrollPosition);
            scrollRef.current.scrollTo({
                left: newScrollPosition * scrollRef.current.offsetWidth / 3,
                behavior: 'smooth',
            });
        }
    };

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
                        <div className="relative">
                            {/* Left Button */}
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 
                                bg-gray-800 text-white p-4 rounded-full shadow-md hover:bg-gray-700 z-10"
                                onClick={scrollLeft}
                            >
                                &larr;
                            </button>

                            {/* Posts Wrapper */}
                            <div
                                className="flex overflow-hidden gap-8 py-4 px-2 scrollbar-hide scroll-smooth"
                                ref={scrollRef}
                                style={{
                                    width: '100%',
                                    transform: `translateX(-${scrollPosition * 33.33}%)`,
                                }}
                            >
                                {posts.map((post, index) => {
                                    const isCenter = index === scrollPosition + 1;
                                    return (
                                        <div
                                            key={post.$id}
                                            className={`transition-all duration-500 ease-in-out transform 
                                            ${isCenter ? 'scale-100 opacity-100' : 'scale-90 opacity-50 blur-sm'}
                                            flex-shrink-0 w-1/3`}
                                            style={{
                                                height: '500px', // Increased height
                                                perspective: '1000px',
                                            }}
                                        >
                                            <PostCard {...post} />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Button */}
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 
                                bg-gray-800 text-white p-4 rounded-full shadow-md hover:bg-gray-700 z-10"
                                onClick={scrollRight}
                            >
                                &rarr;
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Allposts;
