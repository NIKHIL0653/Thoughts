import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBolgs } from "../hooks";


export const Blogs = () => {
  const { loading, blogs } = useBolgs();

  if (loading) {
    return <div>
        <Appbar /> 
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
}

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center">
        <div className="w-4/5 lg:w-3/5">
          {blogs?.map((blog) => {
            return (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name ?? "Anonymous"}
                content={blog.content}
                title={blog.title}
                publishedDate="2nd Feb 2024"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};