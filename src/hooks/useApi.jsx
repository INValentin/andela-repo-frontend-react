import React from 'react'
import toast from 'react-hot-toast'
export const BASE_URL = ['127.0.0.1', 'localhost'].includes(location.hostname) ? 'http://localhost:5000' : "https://andela-express.onrender.com";


const useApi = () => {

    const login = async (creds) => {
        return request('/auth/login', { method: 'POST', body: creds })
    }

    const getBlogComments = async (blogId) => {
        return request(`/blogs/${blogId}/comments`)
    }

    const likeAblog = async (blogId) => {
        return request(`/blogs/${blogId}/like`, { method: 'POST' })
    }

    const commentToAblog = async (blogId, commentData) => {
        return request(`/blogs/${blogId}/comments`, { body: commentData, method: 'POST' })
    }

    const updateAblogComment = async (blogId, commentId, newCommentData) => {
        return request(`/blogs/${blogId}/comments/${commentId}`, { method: 'PUT', body: newCommentData })
    }

    const deleteAblogComment = async (blogId, commentId) => {
        return request(`/blogs/${blogId}/comments/${commentId}`, { method: 'DELETE' })
    }

    const apiRequest = (func, successCallback, successMessage = "Action completed successfully!") => {
        toast.promise(
            func(),
            {
                success: data => {
                    successCallback(data)
                    return successMessage
                },
                loading: <span className='flex items-center'><span className="animate-spin inline-block p-6 border-b-transparent  border-2"></span><span>Loading....</span> </span>,
                error: error => {
                    const errorMsg = (error?.error || error?.message || error || '')?.toString()
                    return errorMsg;
                }

            }
        )
    }


    const request = (url, options = {}) => {
        return fetch(BASE_URL + url, {
            ...options,
            headers: {
                'Accept': '*/*',
                'Authorization': 'Basic ' + (localStorage.getItem('authToken') ?? ''),
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            }
        }).then(async (/**@type {Response} */res) => {
            let data = res.status === 204 ? {} : await res.json()
            if (!res.ok) {
                console.log(data)
                throw new Error(data?.error?.toString() || '')
            }
            return data;
        })
    }

    function apiGenerator(route) {

        return {
            list: () => {
                return request(`/${route}`)
            },
            create: (body, headers = {}) => {
                return request(`/${route}`, { body, method: 'POST', headers })
            },
            get: (id) => request(`/${route}/${id}`),
            update: (id, body, headers = {}) => {
                return request(`/${route}/${id}`, { body, method: 'PUT', headers })
            },
            delete: (id) => {
                return request(`/${route}/${id}`, { method: 'DELETE' })
            }

        }
    }

    // localStorage.setItem('authToken', 'bmV3Ym95OjEyMw==')
    return {
        login,
        blogs: {
            ...apiGenerator('blogs'),
            getBlogComments,
            deleteAblogComment,
            likeAblog,
            updateAblogComment,
            commentToAblog
        },
        users: apiGenerator('users'),
        contacts: apiGenerator('contacts'),
        request: apiRequest
    }
}

export default useApi