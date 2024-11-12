import { SignupInput } from "@mayankbhagyawani/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import logo from '../assets/thoughts_logo.png'; // Import your logo

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        { ...postInputs }
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt);
      localStorage.setItem("username", postInputs.name || ""); // Store the user's name with a fallback
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up/in");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      {/* Logo added here */}
      <img 
        src={logo} 
        alt="Blog Logo" 
        className="mb-14 h-32 w-auto object-contain 
             transition-transform duration-300 
             hover:scale-105"
        onError={(e) => {
        console.error('Logo failed to load');
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x75?text=BLOG+LOGO';
  }}
/>

      <div className="text-3xl font-extrabold">
        {type === "signup" ? "Create an account" : "Sign in to your account"}
      </div>
      <div className="text-l font-normal text-slate-400 mb-4">
        {type === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          to={type === "signin" ? "/signup" : "/signin"}
          className="text-blue-500 underline"
        >
          {type === "signin" ? "Sign up" : "Log in"}
        </Link>
      </div>
      {type === "signup" && (
        <LabelInput
          label="Name"
          placeholder="Enter Name..."
          onChange={(e) => {
            setPostInputs((prev) => ({
              ...prev,
              name: e.target.value
            }));
          }}
        />
      )}
      <LabelInput
        label="Email"
        placeholder="Enter Email..."
        onChange={(e) => {
          setPostInputs((prev) => ({
            ...prev,
            username: e.target.value
          }));
        }}
      />
      <LabelInput
        label="Password"
        type="password"
        placeholder="Enter Password..."
        onChange={(e) => {
          setPostInputs((prev) => ({
            ...prev,
            password: e.target.value
          }));
        }}
      />
      <button
        type="button"
        onClick={sendRequest}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 w-1/2"
      >
        {type === "signin" ? "Sign in" : "Sign up"}
      </button>
    </div>
  );
};

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div className="my-2 w-1/2">
      <label className="block mb-1 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type ?? "text"}
        id="first_name"
        onChange={onChange}
        className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}