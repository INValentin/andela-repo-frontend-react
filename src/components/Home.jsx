import React from 'react'

const Home = () => {
  return (
    <section>
      <div className="left">
        <h1>Software <span>Developer</span></h1>
        <p>My name is <span>John ISHIMWE</span>, contact me for <span>quality work</span>.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, nam!</p>
        <button className="action">Hire Me</button>
      </div>
      <div className="right">
        <img src="./images/coding.png" alt="Coding" />
      </div>
    </section>
  )
}

export default Home