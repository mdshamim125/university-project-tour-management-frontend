
const blogData = [
  {
    id: 1,
    title: "Exploring the Beauty of Switzerland",
    image: "/images/switzerland.jpg",
    category: "Europe",
    author: "Md Shamim",
    date: "2025-12-20",
    description:
      "Switzerland is a beautiful country filled with mountains, lakes, and picturesque towns. Discover the best travel spots in this amazing country...",
  },
  {
    id: 2,
    title: "Top 10 Beaches in Thailand",
    image: "/images/thailand-beach.jpg",
    category: "Asia",
    author: "Md Shamim",
    date: "2025-11-15",
    description:
      "Thailand has some of the most stunning beaches in the world. From Phuket to Koh Samui, here are the must-visit beaches for your next trip...",
  },
  {
    id: 3,
    title: "A Guide to Backpacking in South America",
    image: "/images/south-america.jpg",
    category: "South America",
    author: "Md Shamim",
    date: "2025-10-05",
    description:
      "Backpacking in South America is an adventure like no other. Learn the best routes, tips, and destinations for your journey...",
  },
];

const Blogs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Travel Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <div className="text-sm text-gray-500 mb-2">
                {blog.category} &bull; {blog.date}
              </div>
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-4">{blog.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">By {blog.author}</span>
                <a
                  href="#"
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
