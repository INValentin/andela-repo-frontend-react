import React from 'react'
import useApi from '../hooks/useApi'
import { useForm } from 'react-hook-form'

const Contact = () => {
    const API = useApi()
    const {register, handleSubmit} = useForm();

    const creatContact = (data) => {
        API.request(
            () => API.contacts.create(JSON.stringify(data)),
            () => {},
            'Message sent successfully!'
        )
    }
    return (
        <section>
            <div  className="left">
                <h1>Contact.</h1>
                <p className="action">How to find me.</p>
                <ul className="listing">
                    <li>Email: <span className="accent">johndoe@email.com</span></li>
                    <li>Phone: <span className="accent">+26076589432</span></li>
                    <li>LinkedIn: <span className="accent">linkedin.com/john</span></li>
                </ul>
            </div>
            <div className="right">
                <form onSubmit={handleSubmit(creatContact)} id="contact-form" className="contact">
                    <input {...register('fullName')} id="contact-names" type="text" placeholder="Full Name" />
                    <input {...register('email')} id="contact-email" type="text" placeholder="Email" />
                    <textarea {...register('message')} id="contact-message" placeholder="Message.."></textarea>
                    <button type='submit'>Send</button>
                </form>
            </div>
        </section>
    )
}

export default Contact