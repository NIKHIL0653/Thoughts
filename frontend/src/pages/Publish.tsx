import { useRef } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <Appbar />
      <div className="w-4/5 m-auto mt-10">
        <div>
          <input
            ref={titleRef}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
            required
          />
        </div>
        <div className="my-5">
          <textarea
            ref={contentRef}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Content..."
          />
        </div>
        <button
          type="button"
          onClick={() => {
            axios
              .post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title: titleRef.current?.value,
                  content: contentRef.current?.value,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then((response) => {
                const id = response.data.id;
                navigate(`/blog/${id}`);
              });
          }}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Publish
        </button>
      </div>
    </div>
  );
};
