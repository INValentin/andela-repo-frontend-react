import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import useApi, { BASE_URL } from '../hooks/useApi'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'



const UpdateBlog = () => {
    const API = useApi()
    const [searchParams] = useSearchParams()
    const blogId = searchParams.get('id')
    const [blog, setBlog] = React.useState({});
    const { register, setValue, handleSubmit } = useForm({
        defaultValues: {
            title: blog.title ?? '',
            content: blog.content ?? '',
        }
    })
    const fetchecd = useRef(false)

    useEffect(() => {
        if (!blog) return undefined

        setValue('title', blog.title)
        setValue('content', blog.content)
    }, [blog])

    useEffect(() => {
        if (!blogId.trim().length) {
            toast.error('No valid blog id provided')
            return;
        }
        if (fetchecd.current === true) return undefined
        fetchecd.current = true
        API.request(
            () => API.blogs.get(blogId),
            blog => setBlog(blog),
            "Blog fetched successfully"
        )
    }, [])


    const updateBlog = (data) => {
        console.log(data);
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('content', data.content)
        if (data.blogimage?.length > 0) {
            formData.append('blogimage', data.blogimage.item(0))
        }
        API.request(
            () => fetch(BASE_URL + '/blogs/' + blogId, {
                method: 'PUT', body: formData,
                headers: {
                    'Authorization': 'Basic ' + (localStorage.getItem('authToken') ?? '')
                }
            }).then(async res => {
                let data = res.status === 204 ? {} : await res.json()
                if (!res.ok) {
                    console.log(data)
                    throw new Error(data?.error?.toString() || '')
                }
                return data
            }),
            new_blog => {

                setBlog(new_blog)
                console.log(blog);
            },
            "Blog updated successfully"
        )
    }

    return (
        <>
            <article className="blog-section">
                <div className="left">
                    <h2>Update a blog.</h2>
                    <form onSubmit={handleSubmit(updateBlog)} action="#" id="blog-form" className="blog blog_form">
                        <input   {...register('title')} id="blog-names" type="text" placeholder="Title" />
                        <input {...register('blogimage')} id="blog-image" type="file" accept="image/*" />
                        <textarea  {...register('content')} id="blog-message" placeholder="Article..."></textarea>
                        <button className="blog-form-button" form="blog-form">Update a blog</button>
                    </form>
                </div>
            </article>
            <div className="mt-10">

                {(blogId.trim().length) && <Link id="go-back-link" to={`/article_admin?id=${blogId}`} className="btn" form="blog-form">{"<-"} Go Back </Link>}
            </div>

        </>
    )
}

export default UpdateBlog