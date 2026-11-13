import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'

function Projects() {

  const projects = [

    {
      id: 1,
      title: "Student Management System",
      description: "A system to manage student details, grades and attendance.",
      tech: "Python • SQL",
      image: "/project1.png"
    },

    {
      id: 2,
      title: "Fitness Coach AI",
      description: "An AI-based fitness application for personalized workout guidance.",
      tech: "Python • AI",
      image: "/project2.png"
    },

    {
      id: 3,
      title: "Nike Landing Page",
      description: "A modern and responsive landing page inspired by Nike.",
      tech: "HTML • CSS • Bootstrap",
      image: "/project3.png"
    }

  ]

  return (

    <section className="projects section">

      <div className="section-heading">

        <span className="section-tag">FEATURED PROJECTS</span>

        <h1>Some of My Recent Work</h1>

        <p>
          Here are some projects that showcase my development skills.
        </p>

      </div>


      <div className="projects-container">

        {projects.map((project) => (

          <div className="project-card" key={project.id}>

            <div className="project-image">

              <img
                src={project.image}
                alt={project.title}
              />

            </div>


            <div className="project-details">

              <span className="project-number">
                0{project.id}
              </span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <span className="project-tech">
                {project.tech}
              </span>

              <div className="project-buttons">

                <button>
                  View Project <ArrowUpRight size={16} />
                </button>

                <button>
                  <SiGithub size={17} />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}

export default Projects