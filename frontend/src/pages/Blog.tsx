import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { useBolg } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBolg(id);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (blog) {
    return (
      <div>
        <Appbar />
        {/* Blog section */}
        <div className="grid grid-cols-12 px-10">
          <div className="col-span-8 p-8">
            <div className="font-bold text-3xl">{blog.title}</div>
            <div className="my-3 text-slate-500">Posted on: 22nd July 2024</div>
            <div className="text-slate-600">{blog.content}</div>
          </div>
          {/* Author section */}
          <div className=" col-span-4 p-8">
            <div className="mb-3">Author</div>
            <div className="flex items-center">
              <div>
                <Avatar name={blog.author.name} />
              </div>
              <div className="ml-3">
                <div className="font-bold mb-1">{blog.author.name}</div>
                <div className="text-slate-600">
                  Master of mirth, purveyor of puns, and the funniest person in
                  the kingdom.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};