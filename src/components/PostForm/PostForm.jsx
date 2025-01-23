import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import bucketService from '../../Appwrite/Bucket';
import dbservice from '../../Appwrite/DB';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Input, RTE, Select } from '../index';


function PostForm({ post }) {
    const { register, handleSubmit, setValue, watch, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const [imagePreview, setImagePreview] = useState(null)

    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        try {
            // Safely check if image is present
            console.log('before image file');

            const imageFile = data.image && data.image[0];
            let newFile = null;
            console.log('your image:', imageFile)
            if (imageFile) {
                newFile = await bucketService.createFile(imageFile); // Upload the file
            }

            if (post) {
                // If it's an update
                if (newFile) {
                    bucketService.deleteFile(post.featuredImage); // Delete old file
                }

                const dbPost = await dbservice.updatePost({
                    ...data,
                    featuredImage: newFile ? newFile.$id : post.featuredImage, // Use new file ID or existing featuredImage
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // If it's a new post
                if (newFile) {
                    const fileId = newFile.$id;
                    data.featuredImage = fileId; // Assign file ID to featuredImage
                }

                const dbPost = await dbservice.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };


    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');
        }
        return '';
    });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);



    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap gap-6 bg-gray-50 p-6 rounded-lg shadow-lg"
        >
            {/* Left Section */}
            <div className="w-2/3 px-2 space-y-6">
                {/* Title Section */}
                <Input
                    label="Title:"
                    placeholder="Enter your title"
                    {...register('title', { required: true })}
                    className="w-full text-black"

                />

                {/* Slug Section */}
                <Input
                    label="Slug"
                    placeholder='Slug'
                    className="w-full text-black"
                    {...register('slug', { required: true })}
                    onInput={(e) => {
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                    }
                />

                {/* Editor Section */}
                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                    className="w-full"
                />
            </div>

            {/* Right Section */}
            <div className="w-1/3 px-2 space-y-6">
                {/* Image Preview Section */}
                <div>
                    <Input
                        label='featured Image'
                        type='file'
                        placeholder='select file'
                        accept='image/png, image/jpg, image/jpeg, image/gif'
                        {...register('image', { required: 'image preview' })}

                    />

                </div>
                {post && (
                    <div className="w-full">
                        <img
                            src={bucketService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto border border-gray-300"
                        />
                    </div>
                )}



                {/* Status Select */}

                <Select
                    options={['active', 'inactive']}
                    label='Status'
                    className='mb-4'
                    {...register('status', {
                        required: true,
                    })}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-semibold text-white ${post ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                        } transition`}
                >
                    {post ? 'Update' : 'Submit'}
                </Button>

            </div>

        </form>
    );
}

export default PostForm;
