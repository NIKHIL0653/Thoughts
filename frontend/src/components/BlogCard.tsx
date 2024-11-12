import { Link } from "react-router-dom";

interface BlogCardInput {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardInput) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-4 cursor-pointer">
        <div className="flex items-center">
          <Avatar name={authorName} />
          <div className="mx-2 font-medium">{authorName}</div>
          <div className="rounded-full h-[4px] w-[4px] bg-slate-600"></div>
          <div className="mx-2 font-light text-slate-500">{publishedDate}</div>
        </div>
        <div className="font-bold mt-2 text-lg">{title}</div>
        <div className="text-slate-600 mt-1">{content.slice(0, 100) + "..."}</div>
        <div className="font-light text-slate-600 mt-4">
          {Math.ceil(content.length / 500)} minute(s) read
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-500 rounded-full ${size === "small" ? "w-8 h-8" : "w-10 h-10"}`}>
  <span className={`${size === "small" ? "text-m" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
      {name[0]}
      {/*  Here we extracted the initials of the user to be displayed on the blog card  */}
  </span>
</div>
}