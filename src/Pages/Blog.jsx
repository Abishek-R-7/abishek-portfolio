import {
  ArrowUpRight,
  Calendar,
  Clock,
  BookOpen
} from 'lucide-react'

function Blog() {

  const blogs = [

    {
      id: 1,
      category: "React.js",
      title: "Understanding React Hooks",
      description: "Learn how useState and useEffect help you build dynamic React applications.",
      date: "Learning Guide",
      time: "5 min read"
    },

    {
      id: 2,
      category: "Node.js",
      title: "Introduction to Node.js",
      description: "Understand how Node.js works and how to create backend applications.",
      date: "Learning Guide",
      time: "6 min read"
    },

    {
      id: 3,
      category: "MongoDB",
      title: "Getting Started with MongoDB",
      description: "Learn database fundamentals and how to connect MongoDB with Node.js.",
      date: "Learning Guide",
      time: "7 min read"
    },

    {
      id: 4,
      category: "JavaScript",
      title: "JavaScript Array Methods",
      description: "Explore map, filter and reduce with simple practical examples.",
      date: "Learning Guide",
      time: "5 min read"
    }

  ]

  return (

    <section className="blog section">

      <div className="section-heading">

        <span className="section-tag">
          MY BLOG
        </span>

        <h1>Latest Articles & Insights</h1>

        <p>
          Sharing my programming journey and technical knowledge.
        </p>

      </div>


      <div className="blog-container">

        {blogs.map((blog) => (

          <div className="blog-card" key={blog.id}>

            <div className="blog-image">

              <BookOpen size={45} />

              <span>0{blog.id}</span>

            </div>


            <div className="blog-content">

              <span className="blog-category">
                {blog.category}
              </span>

              <h2>{blog.title}</h2>

              <p>{blog.description}</p>


              <div className="blog-meta">

                <span>
                  <Calendar size={14} />
                  {blog.date}
                </span>

                <span>
                  <Clock size={14} />
                  {blog.time}
                </span>

              </div>


              <button className="blog-btn">
                Read More <ArrowUpRight size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}

export default Blog