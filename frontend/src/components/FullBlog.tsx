// FullBlog.tsx
import { Blog } from "../hooks"; // Ensure this import is correct based on your project structure
import { Appbar } from "./Appbar";
import { Avatar } from "./Avatar.tsx"; // Adjust the path if necessary
// import { BlogCard } from "./BlogCard"; // Ensure this import is correct based on your project structure

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on 27th October 2024
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.authorName || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.authorName || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Author Description
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};