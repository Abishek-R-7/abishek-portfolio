import { useState } from 'react'

import {
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react'

function Contact() {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    subject: "",
    message: ""

  })

  const [status, setStatus] = useState("")


  // Handle input changes

  function handleChange(e) {

    const { name, value } = e.target

    setFormData({

      ...formData,

      [name]: value

    })

  }


  // Handle form submission

  function handleSubmit(e) {

    e.preventDefault()

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {

      setStatus("error")

      return

    }

    setStatus("success")

    setFormData({

      name: "",
      email: "",
      subject: "",
      message: ""

    })

  }


  return (

    <section className="contact section">

      <div className="section-heading">

        <span className="section-tag">
          CONTACT ME
        </span>

        <h1>Let's Work Together</h1>

        <p>
          Have a project in mind? Let's discuss your ideas.
        </p>

      </div>


      <div className="contact-container">


        {/* Contact Information */}

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>
            I'm always open to discussing new projects,
            creative ideas and opportunities.
          </p>


          <div className="contact-item">

            <div className="contact-icon">
              <Mail />
            </div>

            <div>
              <h4>Email</h4>
              <span>abiee.pvt9400@gmail.com</span>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              <Phone />
            </div>

            <div>
              <h4>Phone</h4>
              <span>7604982693</span>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              <MapPin />
            </div>

            <div>
              <h4>Location</h4>
              <span>Madurai, Tamil Nadu</span>
            </div>

          </div>

        </div>



        {/* Contact Form */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h2>Send Me a Message</h2>


          <div className="input-group">

            <label>Your Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Your Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Subject</label>

            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Message</label>

            <textarea
              name="message"
              placeholder="Write your message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

          </div>


          {status === "success" && (

            <p className="success-message">
              Form validated successfully! Connect a backend
              or email service to send this message.
            </p>

          )}


          {status === "error" && (

            <p className="error-message">
              Please fill in all fields correctly.
            </p>

          )}


          <button type="submit" className="primary-btn">

            Submit Message <Send size={17} />

          </button>


        </form>

      </div>

    </section>

  )

}

export default Contact