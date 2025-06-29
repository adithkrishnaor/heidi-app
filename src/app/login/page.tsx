"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
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
              <label className="block text-blue-500 text-sm font-medium mb-2">
                Email Or Phone Number
              </label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                placeholder="Enter Here"
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-300"
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
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-300 pr-12"
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
                <span className="text-blue-600 font-bold">🍎</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-8 text-white">
        <div className="relative">
          <Image
            src="/images/Icon.png"
            alt="Heidi AI Dashboard Illustration"
            width={200}
            height={150}
          />
        </div>
        <br />
        <br />
        <div className="relative">
          <Image
            src="/images/Logo_1.png"
            alt="Heidi AI Dashboard Illustration"
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
