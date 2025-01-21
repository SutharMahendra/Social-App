import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bucketService from '../Appwrite/Bucket';

function PostCard({ $id, title, featuredImage }) {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const url = await bucketService.getFilePreview(featuredImage);
                if (url) {
                    setImageUrl(url);
                }
            } catch (error) {
                console.log('Failed to get image URL:', error);
            }
        };

        fetchUrl();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image Section */}
                <div className="overflow-hidden rounded-t-xl">
                    <img
                        src={imageUrl || 'https://via.placeholder.com/400'} // Placeholder for missing images
                        alt={title}
                        className="object-cover w-fit h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {/* Title Section */}
                <div className="p-4">
                    <h2
                        className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
                    >
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
