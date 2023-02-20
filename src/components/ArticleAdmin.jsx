import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useApi, { BASE_URL } from '../hooks/useApi'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'

const ArticleContent = ({ data: article, addComment, onCommentDelete, onDelete }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { comment: '' }
    })


    return (
        <article className="w-auto px-2 md:w-[600px] max-w-4xl mx-auto ">
            <p >Viewing as
                &nbsp;<u><strong>Admin</strong></u></p>
            <h4 className="article-title">{article.title}</h4>
            <div className="right">
                <div className="article-message">
                    {article.content}
                </div>
                {article.image && <img src={BASE_URL + '/' + article.image} className="article-img" />}

            </div>

            <form onSubmit={handleSubmit(addComment)} className="comment-form">
                <div className="flex items-center gap-2">
                    <h3 className="text-md font-bold m-0">{'('}{article.comments.length}{')'} Likes</h3>
                    |
                    <h3 className="blog-comment-count">{'('}{article.comments.length}{')'} comments</h3>
                </div>
                <textarea {...register('comment')} id="comment-message" placeholder="Comment here.."></textarea>
                <button type='submit' className="btn">Comment</button>
            </form>
            <div className='flex items-center gap-2' >
                <button className="article-remove blog-remove mt-[0!important]" onClick={onDelete} >Delete as Admin?</button>
                | <Link id="update-link" to={`/update-blog?id=${article._id}`} className=" btn">Update blog</Link>
            </div>
            <div>

                <h3 className='text-2xl underline underline-offset-4' >Comments:</h3>

                <div className="comment-list gap-1 p-2 mb-1">
                    {!(article.comments.length) && "No comments"}
                    {article.comments.map(cmt => (
                        <div key={cmt.id} className="comment">
                            <div className="comment-author"><span className="comment-author-name">{cmt.user}</span>
                            </div>
                            <div className="comment-message">{cmt.comment}</div>
                            <span className="w-10 h-1 bg-black"></span>
                            <button className='p-2 rounded border-0 my-1 bg-red-500 text-white inline-block w-fit' onClick={() => onCommentDelete(cmt.id)}>Delete ?</button>
                        </div>

                    ))}
                </div>
            </div>
        </article>
    )
}



const ArticleAdmin = () => {
    const API = useApi()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [article, setArticle] = React.useState(null)
    const fetched = React.useRef(false)

    useEffect(() => {
        if (fetched.current) return undefined
        fetched.current = true
        API.request(
            () => API.blogs.get(searchParams.get("id")),
            article => {
                setArticle(article)
                console.log(article)
            },
            "Article fetched successfully!"
        )
    }, [])

    const addComment = (data) => {
        API.request(
            () => API.blogs.commentToAblog(article._id, JSON.stringify(data)),
            (comment) => {
                const newArticle = { ...article, comments: [comment, ...article.comments] }

                console.log(newArticle)
                setArticle(newArticle)
            },
            "Comment added successfully!"
        )
    }


    const handleDelete = () => {
        API.request(
            () => API.blogs.delete(article._id),
            () => {
                console.log("deleted")
                navigate('/blog')
            },
            "Article deleted successfully!"
        )
    }

    const handleCommentDelete = (id) => {
        API.request(
            () => API.blogs.deleteAblogComment(article._id, id),
            () => {
                const newArticle = { ...article, comments: article.comments.filter(c => c.id !== id) }
                setArticle(newArticle)
            },
            "Comment deleted successfully!"
        )
    }

    return (
        article && <ArticleContent onCommentDelete={handleCommentDelete} addComment={addComment} onDelete={handleDelete} data={article} />
    )
}

export default ArticleAdmin