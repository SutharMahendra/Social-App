import { useEffect, useState } from 'react';

function Home() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <main className="min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-b from-blue-100 to-white">
            <div className="text-center max-w-3xl">
                <h1 className={`text-5xl font-extrabold text-gray-800 mb-6 
                    transition-all duration-1000 ease-out transform 
                    ${animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-110'}`}
                >
                    Welcome to SocialSphere 🌟
                </h1>
                <p className={`text-gray-600 text-lg mb-8 
                    transition-all duration-1000 ease-out transform delay-200
                    ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    Connect, share, and discover stories from your community.
                </p>
                <button
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:scale-110 hover:bg-blue-700 transition-all duration-300 ease-in-out transform"
                    onClick={() => alert('About Me clicked!')}
                >
                    About Me
                </button>
            </div>
        </main>
    );
}

export default Home;
