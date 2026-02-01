import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Signup = () => {
    const [authUser, setAuthUser] = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
        };
        setLoading(true);
        try {
            const url = "http://localhost:5003/api/users/register";
            const response = await axios.post(url, userInfo, {
                withCredentials: true,
            });
            if (response.data) {
                toast.success("Signup successful");
                localStorage.setItem("Chatify", JSON.stringify(response.data));
                setAuthUser(response.data);
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Signup failed");
            } else {
                toast.error("Signup failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-slate-900 text-white px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full px-4 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className="w-full px-4 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-[calc(50%-2px)] text-slate-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className="w-full px-4 py-2 mt-1 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-[calc(50%-2px)] text-slate-400 hover:text-white"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                        ) : (
                            "Signup"
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
