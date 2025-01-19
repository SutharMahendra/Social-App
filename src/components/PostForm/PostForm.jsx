
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import bucketService from '../../Appwrite/Bucket';
import dbservice from '../../Appwrite/DB';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Input, RTE, Select } from '../index'


function PostForm({ post }) {

    const { register, handleSubmit, setValue, watch, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate()
    const userData = useSelector(state => state.userData)

    const submit = async (data) => {
        if (post) {
            const newFile = data.image[0] ? await bucketService.createFile(data.image[0]) : null;
            if (newFile) {
                bucketService.deleteFile(post.featuredImage)
            }
            const dbPost = await dbservice.updatePost({
                ...data, featuredImage: newFile ? newFile.$id : undefined
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const newFile = await bucketService.createFile(data.image[0])
            if (newFile) {
                const fileId = newFile.$id
                data.featuredImage = fileId
                const dbPost = await dbservice.createPost({ ...data, userId: userData.$id })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return '';
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        });
    }, [watch, slugTransform, setValue]);


    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className='w-2/3 px-2'>
                {/* title section */}
                <Input
                    label='Title:'
                    placeholder='enter you name'
                    type='text'
                    {...register('title', {
                        required: true
                    })}
                />

                {/* slug section */}
                <Input
                    label='Slug'
                    placeholder=' slug'
                    className='mb-4'
                    onInput={(e) => setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })}
                    {...register('slug', {
                        required: true
                    })}

                />
                {/* editor section */}
                <RTE
                    label='Content:'
                    name='content'
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className='w-1/3 px-2'>

                {post && (
                    <div className='w-full mb-4'>
                        <img
                            src={bucketService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}
                <Select

                    value={getValues('status')}
                    onChange={(e) => {
                        setValue('status', (e.currentTarget.value))

                    }}
                >
                    <option value="active">active</option>
                    <option value="diactivate">diactivate</option>
                </Select>

                <Button
                    type='submit'
                    className='w-full mb-4'
                    bgColor={post ? 'bg-green-500' : 'undefined'}
                >
                    {post ? 'Update' : 'Submit'}
                </Button>

            </div>





        </form>


    )
}

export default PostForm
