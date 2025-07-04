"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Login submitted:", formData);
    // Add your login logic here
    // Import useRouter from Next.js

    router.push("/home");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Add social login logic here
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // Add forgot password logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-8">Log In</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-blue-700 text-sm font-medium mb-2">
                Email Or Phone Number
              </label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder="Enter Here"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-300 text-blue-700"
                required
              />
            </div>

            <div>
              <label className="block text-blue-500 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-300 text-blue-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 text-lg"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <button
                  onClick={handleForgotPassword}
                  className="text-blue-400 text-sm hover:underline bg-transparent border-none cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-200"
            >
              Log In
            </button>
          </div>

          <div className="text-center">
            <span className="text-blue-500">Don't have an account? </span>
            <Link
              href="/signup"
              className="text-blue-500 hover:underline font-medium bg-transparent border-none cursor-pointer"
            >
              Sign Up
            </Link>
          </div>

          <div className="text-center">
            <div className="text-blue-500 font-medium mb-4">OR</div>
            <div className="text-blue-500 text-sm mb-4">Continue with</div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSocialLogin("Google")}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-200"
              >
                <span className="text-blue-600 font-bold">G</span>
              </button>
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-200"
              >
                <span className="text-blue-600 font-bold">f</span>
              </button>
              <button
                onClick={() => handleSocialLogin("Apple")}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-5 h-5 fill-blue-600"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="flex-1 bg-gradient-to-br from-[#008DDF] to-[#B3F0FF] flex flex-col items-center justify-center p-8 text-white">
        <div className="relative">
          <center>
            <h1
              className="text-3xl font-bold"
              style={{
                fontFamily: "Poupin, sans-serif",
                color: "#FFE310",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              <strong>Meeting's over. I've got the goods.</strong>
              <br /> <br />
              <span
                className="font-normal"
                style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)" }}
              >
                You? Just go be brilliant.
              </span>
            </h1>
          </center>
        </div>
        <div className="relative">
          <Image
            src="/images/pose_1.png"
            alt="Heidi Pose 1"
            width={500}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
