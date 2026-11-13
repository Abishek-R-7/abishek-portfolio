import { CalendarDays, Code, Users, Trophy, User } from 'lucide-react'

function About() {

  const stats = [
    {
      icon: <CalendarDays />,
      number: "1+",
      title: "Years Learning"
    },
    {
      icon: <Code />,
      number: "5+",
      title: "Projects Completed"
    },
    {
      icon: <Users />,
      number: "10+",
      title: "Technologies Learned"
    },
    {
      icon: <Trophy />,
      number: "100%",
      title: "Passion for Coding"
    }
  ]

  return (

    <section className="about section">

      <div className="about-content">

        <span className="section-tag">ABOUT ME</span>

        <h1>
          I'm passionate about <br />
          creating <span>digital solutions</span>
        </h1>

        <p>
          I'm Abishek R, a passionate Full Stack Developer
          interested in creating modern and responsive
          web applications.

          I enjoy working with frontend and backend
          technologies to build useful digital solutions.
        </p>

        <p>
          My technical skills include React.js, JavaScript,
          Node.js, Express.js, Python, SQL and MongoDB.
        </p>

        <button className="primary-btn">
          Learn More About Me <User size={17} />
        </button>

      </div>


      <div className="stats-container">

        {stats.map((item, index) => (

          <div className="stat-card" key={index}>

            <div className="stat-icon">
              {item.icon}
            </div>

            <div>
              <h2>{item.number}</h2>
              <p>{item.title}</p>
            </div>

          </div>

        ))}

      </div>

    </section>

  )

}

export default About