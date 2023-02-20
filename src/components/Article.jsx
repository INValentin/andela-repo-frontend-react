import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useApi, { BASE_URL } from '../hooks/useApi'

import { useForm } from 'react-hook-form'

const ArticleContent = ({ data: article, addComment, likeAblog }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { comment: '' }
    })

    return <article className="w-auto px-2 md:w-[600px] max-w-4xl mx-auto ">
        <h4 className="article-title">{article.title}</h4>
        <div className="right">
            <div className="article-message">
                {article.content}
            </div>
            {article.image && <img src={BASE_URL + '/' + article.image} className="article-img" />}

            <hr />
            <form onSubmit={handleSubmit(addComment)} className="comment-form border-t-2 pt-2">
                <div className='flex items-center gap-2'>
                    <button onClick={likeAblog} type="button" className="blog-like blog-btn">
                        <span className="blog-count">{article.likes?.length}</span>
                        <ion-icon size="large" name="thumbs-up"></ion-icon>
                    </button>
                    |
                    <h3 className="blog-comment-count">{'('}{article.comments.length}{')'} comments</h3>
                </div>
                <textarea {...register('comment')} id="comment-message" placeholder="Comment here.."></textarea>
                <button type='submit' className="btn">Comment</button>
            </form>
            <h3 className='text-2xl underline underline-offset-4' >Comments:</h3>

            <div className="comment-list gap-1 mb-1">
                {!(article.comments.length) && "No comments"}
                {article.comments.map(cmt => (
                    <div key={cmt.id} className="comment">
                        <div className="comment-author"><span className="comment-author-name">{cmt.user}</span>
                        </div>
                        <div className="comment-message">{cmt.comment}</div>
                        <span className="w-10 h-1 bg-black"></span>
                    </div>

                ))}
            </div>
        </div>
    </article>
}


const Article = () => {
    const API = useApi()
    const [searchParams] = useSearchParams()

    const [article, setArticle] = React.useState(null)
    const fetched = React.useRef(false)

    useEffect(() => {
        if (fetched.current) return undefined
        fetched.current = true
        API.request(
            () => API.blogs.get(searchParams.get("id")),
            article => setArticle(article),
            "Article fetched successfully!"
        )
    }, [])

    const likeBlog = () => {
        API.request(
            () => API.blogs.likeAblog(article._id),
            ({ likes }) => {
                console.log({ likes })
                const newArticle = { ...article }
                if (likes < article.likes.length) {
                    newArticle.likes.pop()
                } else {
                    newArticle.likes.push('0')
                }
                newArticle.likes = newArticle.likes;
                setArticle(newArticle)
            },
            "Article liked successfully!"
        )
    }
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


    return (
        article && <ArticleContent likeAblog={likeBlog} addComment={addComment} data={article} />
    )
}

export default Article