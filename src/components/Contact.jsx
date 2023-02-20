import React from 'react'

const Contact = () => {
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
                <form action="#" id="contact-form" className="contact">
                    <input id="contact-names" type="text" placeholder="Full Name" />
                    <input id="contact-email" type="text" placeholder="Email" />
                    <textarea id="contact-message" placeholder="Message.."></textarea>
                    <button>Send</button>
                </form>
            </div>
        </section>
    )
}

export default Contact