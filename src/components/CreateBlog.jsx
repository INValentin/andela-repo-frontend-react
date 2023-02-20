import React from 'react'
import { Link } from 'react-router-dom'
import useApi, { BASE_URL } from '../hooks/useApi'
import hocAPI from './hocs/apiHoc'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


const CreateBlog = ({ data }) => {
    const [blogs, setBlogs] = useState(data)
    const { register, handleSubmit } = useForm({
        title: '',
        content: '',
        blogimage: ''
    })
    const API = useApi()

    const createBlog = (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('content', data.content)
        if (data.blogimage?.length) {
            formData.append('blogimage', data.blogimage.item(0))
        }

        API.request(
            () => fetch(BASE_URL + '/blogs', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Basic ' + (localStorage.getItem('authToken') ?? ''),
                }
            }).then(async res => {
                let data = res.status === 204 ? {} : await res.json()
                if (!res.ok) {
                    console.log(data)
                    throw new Error(data?.error?.toString() || '')
                }
                return data;
            }),
            (blog) => {
                setBlogs([blog, ...blogs])
            },
            'New blog created successfully'
        )
    }
    return (
        <article className="blog-section">
            <div className="left max-w-2xl mx-auto">
                <h2>Create a blog.</h2>
                <form onSubmit={handleSubmit(createBlog)} action="#" id="blog-form" className="blog blog_form">
                    <input {...register('title')} id="blog-names" type="text" placeholder="Title" />
                    <input  {...register('blogimage')} className='bg-white' id="blog-image" type="file" accept="image/*" />
                    <textarea  {...register('content')} id="blog-message" placeholder="Article..."></textarea>
                    <button className="blog-form-button" form="blog-form">Create a blog</button>
                </form>
            </div>
            <div className="right">
                <div className="blog-list">
                    <h3 className="text-2xl underline">All Blogs</h3>
                    {blogs.map(blog => (
                        <div key={blog._id} className="user-blog">
                            <div className="blog-name">{blog.title}</div>
                            <div className="blog-email">Admin</div>
                            <div className="blog-message">{blog.content}</div>
                            {blog.image && <img src={BASE_URL + '/' + blog.image} className="blog-image" />}
                            <div className="blog-message">
                                <Link to={"/article?id=" + blog._id} className="blog-readmore inline-block px-3 mr-2">Read
                                    more</Link>
                            </div>
                            <div className="blog-message">
                                <button type="button" className="blog-like blog-btn">
                                    <span className="blog-count">{blog.likes?.length}</span>
                                    <ion-icon size="large" name="thumbs-up"></ion-icon>
                                </button>
                                <button className="blog-comment blog-btn">
                                    <span className="blog-count">{blog.comments?.length}</span>
                                    <ion-icon size="large" name="chatbubbles"></ion-icon>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

export default hocAPI(CreateBlog, useApi().blogs.list, "Blogs fetched!")