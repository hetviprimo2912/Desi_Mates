import React, { useState } from "react";
import {
    EyeIcon,
    EyeSlashIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightOnRectangleIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import LeftSection from "./LeftSection";
import { useAppDispatch } from "../../../Hooks/hooks";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../Store/slices/LoginSlice/loginThunk";


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [loginLoading, setLoginLoading] = useState(false);

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors: {
            email?: string;
            password?: string;
        } = {};

        if (!formData.email) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoginLoading(true);

            // TODO:
            // Call Login API here

            const response = await dispatch(
                loginAdmin(formData)
            );

            if (loginAdmin.fulfilled.match(response)) {
                console.log(response.payload);

                navigate("/dashboard");
            }
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden">
            <LeftSection />

            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto">

                <div className="w-full max-w-[560px] lg:max-w-[520px] xl:max-w-[540px] 2xl:max-w-[650px]">

                    <div className="bg-white rounded-xl border border-gray-200 shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6 sm:p-8 lg:p-8 xl:p-10">

                        {/* Logo */}

                        {/* Logo */}

                        <div className="flex justify-center mb-6">
                            <img
                                src="/admin/logo/logo.png"
                                alt="DesiMates"
                                className="h-24 w-auto object-contain"
                            />
                        </div>

                        {/* Heading */}

                        <div className="text-center mb-8">

                            <h1 className="text-3xl font-bold text-gray-900">
                                Welcome Back!
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Sign in with your credentials to continue
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>

                                <div className="relative">

                                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm outline-none transition-all ${errors.email
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                                            }`}
                                    />

                                </div>

                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            {/* Password */}

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className={`w-full pl-12 pr-12 py-3 rounded-xl border text-sm outline-none transition-all ${errors.password
                                            ? "border-red-500 bg-red-50"
                                            : "border-gray-300 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {errors.password}
                                    </p>
                                )}


                            </div>

                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >

                                {loginLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                )}

                                {loginLoading ? "Signing In..." : "Sign In"}

                            </button>

                        </form>

                    </div>

                    {/* Footer */}

                    <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">

                        <ShieldCheckIcon className="w-4 h-4" />

                        <span>
                            Secure login with <strong>DesiMates</strong>
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default LoginPage;