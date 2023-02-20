import React from 'react'

const Portifolio = () => {
    return (
        <>
            <section>
                <div className="left">
                    <h1 >Skills.</h1>
                    <p className="action">What makes a difference.</p>
                    <ul className="listing">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                    </ul>
                </div>
                <div className="right">
                    <img src="./images/skills.png" alt="Coding" />
                </div>
            </section>
            <section>
                <div className="left">
                    <h1 >Experience.</h1>
                    <p className="action">What is special.</p>
                    <ul className="listing">
                        <li>1+ year of HTML</li>
                        <li>1+ year of CSS</li>
                        <li>6+ months of JavaScript</li>
                    </ul>
                </div>
                <div className="right">
                    <img src="./images/experience.png" alt="Coding" />
                </div>
            </section>
        </>
    )
}

export default Portifolio