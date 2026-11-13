import { ArrowUpRight, Download } from 'lucide-react'
import {useNavigate} from "react-router-dom"

function Home() {

  const navigate = useNavigate();

  return (

    <section className="home">

      <div className="home-content">

        <span className="tag">
          I'M A FULL STACK DEVELOPER
        </span>

        <h1>
          Hi, I'm <span>ABISHEK</span>
        </h1>

        <h2>
          I build things for the web.
        </h2>

        <p>
          Passionate about building responsive web applications
          and robust backends using modern web technologies.
        </p>

        <div className="home-buttons">

  <button
  className="primary-btn"
  onClick={() => window.open("/Resume.pdf", "_blank")}
>
  View My Work <ArrowUpRight size={18} />
</button>

  <a
    href="/Resume.pdf"
    download="Abishek_Resume.pdf"
    className="secondary-btn"
  >
    Download CV <Download size={18} />
  </a>

</div>

        <div className="tech">

          <p>TECHNOLOGIES I WORK WITH</p>

          <div className="tech-list">
            <span>HTML</span>
            <span>CSS</span>
            <span>JS</span>
            <span>React</span>
            <span>Python</span>
            <span>Node.js</span>
            <span>MongoDB</span>
          </div>

        </div>

      </div>

      <div className="home-image">

        <div className="image-circle"></div>

        <img
          src="/profile.png"
          alt="Abishek Profile"
        />

      </div>

    </section>

  )

}

export default Home