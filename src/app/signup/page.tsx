"use client";
import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  const iconStyles = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400'
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 ${alertStyles[type]} flex items-center justify-between`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircle className={`w-5 h-5 mr-3 ${iconStyles[type]}`} />
        ) : (
          <AlertCircle className={`w-5 h-5 mr-3 ${iconStyles[type]}`} />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className={`${iconStyles[type]} hover:opacity-75 transition-opacity`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [alert, setAlert] = useState<{type: 'success' | 'error' | 'warning', message: string} | null>(null);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Phone validation regex (basic international format)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'emailOrPhone':
        if (!value.trim()) {
          return 'Email or phone number is required';
        }
        // Check if it's an email or phone
        const isEmail = value.includes('@');
        const isPhone = /^\d/.test(value.replace(/[\s\-\+\(\)]/g, ''));
        
        if (isEmail && !emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        if (isPhone && !phoneRegex.test(value.replace(/[\s\-\+\(\)]/g, ''))) {
          return 'Please enter a valid phone number';
        }
        if (!isEmail && !isPhone) {
          return 'Please enter a valid email or phone number';
        }
        return '';
      
      case 'password':
        if (!value) {
          return 'Password is required';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters long';
        }
        if (!/(?=.*[a-z])/.test(value)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(value)) {
          return 'Password must contain at least one number';
        }
        return '';
      
      case 'confirmPassword':
        if (!value) {
          return 'Please confirm your password';
        }
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear alert when user starts typing
    if (alert) {
      setAlert(null);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const showAlert = (type: 'success' | 'error' | 'warning', message: string) => {
    setAlert({ type, message });
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => setAlert(null), 5000);
    }
  };

  // Separate form submission logic without event dependency
  const submitForm = async () => {
    // Clear any existing alerts
    setAlert(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.emailOrPhone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('success', 'Account created successfully! Redirecting to login...');
        
        // Clear form data
        setFormData({
          emailOrPhone: "",
          password: "",
          confirmPassword: "",
        });
        
        // Delay redirect to show success message
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
      } else {
        // Handle different types of errors
        if (response.status === 409) {
          showAlert('error', 'An account with this email already exists. Please try logging in instead.');
        } else if (response.status === 400) {
          showAlert('error', data.message || 'Please check your input and try again.');
        } else if (response.status >= 500) {
          showAlert('error', 'Server error. Please try again later.');
        } else {
          showAlert('error', data.message || 'Signup failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      showAlert('error', 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await submitForm();
  };

  const handleSocialSignup = async (provider: string) => {
    setAlert(null);
    showAlert('warning', `${provider} signup is not yet implemented`);
    
    // TODO: Implement actual social signup
    console.log(`Sign up with ${provider}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      submitForm();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 bg-gradient-to-br from-[#008DDF] to-[#B3F0FF] relative">
        <Image
          src="/images/login_img.png"
          alt="Heidi Pose 1"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-8">Sign Up</h2>

          {/* Alert Component */}
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-blue-500 text-sm font-medium mb-2">
                Email Or Phone Number *
              </label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email or phone number"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none placeholder-blue-300 text-blue-700 transition-colors duration-200 ${
                  errors.emailOrPhone 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-blue-200 focus:border-blue-500'
                }`}
                required
                disabled={isLoading}
              />
              {errors.emailOrPhone && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.emailOrPhone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-blue-500 text-sm font-medium mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  placeholder="Create a strong password"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none placeholder-blue-300 text-blue-700 transition-colors duration-200 ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500 bg-red-50' 
                      : 'border-blue-200 focus:border-blue-500'
                  }`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
              <div className="mt-2 text-xs text-blue-500">
                Password must contain: 6+ characters, uppercase, lowercase, and number
              </div>
            </div>

            <div>
              <label className="block text-blue-500 text-sm font-medium mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg focus:outline-none placeholder-blue-300 text-blue-700 transition-colors duration-200 ${
                    errors.confirmPassword 
                      ? 'border-red-300 focus:border-red-500 bg-red-50' 
                      : 'border-blue-200 focus:border-blue-500'
                  }`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>

          <div className="text-center">
            <span className="text-blue-500">Have an account? </span>
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-medium transition-colors duration-200"
            >
              Log In
            </Link>
          </div>

          <div className="text-center">
            <div className="text-blue-500 font-medium mb-4">OR</div>
            <div className="text-blue-500 text-sm mb-4">Continue with</div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Sign up with Google"
              >
                <span className="text-blue-600 font-bold">G</span>
              </button>
              <button
                onClick={() => handleSocialSignup("Facebook")}
                disabled={isLoading}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Sign up with Facebook"
              >
                <span className="text-blue-600 font-bold">f</span>
              </button>
              <button
                onClick={() => handleSocialSignup("Apple")}
                disabled={isLoading}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Sign up with Apple"
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
    </div>
  );
};

export default Signup;
