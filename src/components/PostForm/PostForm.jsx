import React, { useCallback, useEffect } from 'react';
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

    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);

    const submit = async (data) => {
        if (post) {
            const newFile = data.image[0] ? await bucketService.createFile(data.image[0]) : null;
            if (newFile) {
                bucketService.deleteFile(post.featuredImage);
            }
            const dbPost = await dbservice.updatePost({
                ...data,
                featuredImage: newFile ? newFile.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const newFile = await bucketService.createFile(data.image[0]);
            if (newFile) {
                const fileId = newFile.$id;
                data.featuredImage = fileId;
                const dbPost = await dbservice.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
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
                    type="text"
                    {...register('title', { required: true })}
                    className="w-full text-black"
                />

                {/* Slug Section */}
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="w-full text-black"
                    onInput={(e) =>
                        setValue('slug', slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                    {...register('slug', { required: true })}
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
                        required: true
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
