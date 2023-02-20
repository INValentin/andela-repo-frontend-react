import React, { useEffect, useRef, useState } from 'react'
import useApi from '../hooks/useApi'
import hocAPI from './hocs/apiHoc'
import { Link } from 'react-router-dom'

const Blogs = ({ data: blogs }) => {
    // const [blogs, setBlogs] = useState([])
    // const blogsFetched = useRef(false)
    // const API = useApi()

    // useEffect(() => {
    //     if (blogsFetched.current === true) return undefined;
    //     blogsFetched.current = true;

    //     API.request(
    //         API.blogs.list,
    //         blogs => {
    //             setBlogs(blogs)
    //         },
    //         "Blogs fetched!"
    //     )
    // }, [])

    return (
        <main >
            <article className="blog-section">
                <div className="left">
                </div>
                <div className="right">
                    <div className="blog-list">
                        {blogs.map(blog => (
                            <div key={blog._id} className="user-blog">
                                <div className="blog-name">{blog.title}</div>
                                <div className="blog-email">Admin</div>
                                <div className="blog-message">{blog.content}</div>
                                <img className="blog-image" />
                                <div className="blog-message">
                                    <Link to={"/article?id=" + blog._id} className="blog-readmore inline-block px-3 mr-2">Read
                                        more</Link>
                                </div>
                                <div className="blog-message">
                                    <button type="button" className="blog-like blog-btn">
                                        <span className="blog-count">{blog.likes.length}</span>
                                        <ion-icon size="large" name="thumbs-up"></ion-icon>
                                    </button>
                                    <button className="blog-comment blog-btn">
                                        <span className="blog-count">{blog.comments.length}</span>
                                        <ion-icon size="large" name="chatbubbles"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </article>
        </main>
    )
}

export default hocAPI(Blogs, useApi().blogs.list, "Blogs fetched!")  