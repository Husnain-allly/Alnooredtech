import React from "react";

const blogs = [
  {
    id: 1,
    title: "The Future of Learning: How Technology is Shaping Education",
    date: "October 28, 2025",
    image:
      "https://images.unsplash.com/photo-1584697964154-3bcb48c3c3f2?auto=format&fit=crop&w=800&q=60",
    excerpt:
      "Discover how AI, online platforms, and digital classrooms are transforming traditional education models and empowering lifelong learners.",
  },
  {
    id: 2,
    title: "Building Skills for Tomorrow’s Jobs",
    date: "September 10, 2025",
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6b78d8a1?auto=format&fit=crop&w=800&q=60",
    excerpt:
      "From coding to creative thinking — explore the essential skills every student must develop to stay relevant in the digital age.",
  },
  {
    id: 3,
    title: "Why Volunteering Builds Leadership in Youth",
    date: "August 22, 2025",
    image:
      "https://images.unsplash.com/photo-1603575448367-16e8f5b1c4e8?auto=format&fit=crop&w=800&q=60",
    excerpt:
      "Volunteering doesn’t just help communities — it builds empathy, teamwork, and confidence in future leaders.",
  },
];

const Blogs = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
          Our Latest Blogs
        </h2>
        <p className="text-gray-300 text-sm md:text-base">
          Insights, updates, and stories from Al Noor EdTech — exploring education,
          innovation, and impact.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <p className="text-sm text-yellow-400 mb-2">{blog.date}</p>
              <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{blog.excerpt}</p>

              <a
                href="#"
                className="text-yellow-400 font-medium text-sm hover:text-yellow-300 transition"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
