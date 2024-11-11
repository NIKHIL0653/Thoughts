import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b flex justify-between px-10 py-4 items-center">
      <div className="font-medium">
        <Link to="/blogs">THOUGHTS</Link>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            navigate("/publish");
          }}
          className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
        >
          Whats on Your Mind!?
        </button>
        <Avatar name="N" />
      </div>
    </div>
  );
};
