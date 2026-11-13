import {
  Code,
  Database,
  Globe,
  Terminal,
  Palette
} from 'lucide-react'

import { SiGithub } from 'react-icons/si'

function Skills() {

  const skills = [

    {
      name: "HTML",
      percentage: "95%",
      icon: <Code />
    },

    {
      name: "CSS",
      percentage: "90%",
      icon: <Palette />
    },

    {
      name: "JavaScript",
      percentage: "85%",
      icon: <Terminal />
    },

    {
      name: "React.js",
      percentage: "85%",
      icon: <Code />
    },

    {
      name: "Node.js",
      percentage: "75%",
      icon: <Terminal />
    },

    {
      name: "Express.js",
      percentage: "75%",
      icon: <Globe />
    },

    {
      name: "Python",
      percentage: "85%",
      icon: <Terminal />
    },

    {
      name: "SQL",
      percentage: "85%",
      icon: <Database />
    },

    {
      name: "MongoDB",
      percentage: "75%",
      icon: <Database />
    },

  {
  name: "Git & GitHub",
  percentage: "80%",
  icon: <SiGithub />
}

  ]

  return (

    <section className="skills section">

      <div className="section-heading">

        <span className="section-tag">MY SKILLS</span>

        <h1>Technologies I Master</h1>

        <p>
          Technologies and tools I use to build modern applications.
        </p>

      </div>


      <div className="skills-container">

        {skills.map((skill, index) => (

          <div className="skill-card" key={index}>

            <div className="skill-info">

              <div className="skill-name">

                {skill.icon}

                <span>{skill.name}</span>

              </div>

              <span>{skill.percentage}</span>

            </div>


            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: skill.percentage }}
              ></div>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}

export default Skills