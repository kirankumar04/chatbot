import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaUserCheck, FaUserTie } from "react-icons/fa"; // Icons
import Navbar from "../components/Navbar";
import ChatbotButton from "../components/ChatbotButton";

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className={`pt-32 pb-16 px-6 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h1 className="text-3xl font-bold text-blue-900">
                                Welcome to <span className="text-blue-500">LIET College</span> Companion
                            </h1>
                            <p className="text-lg text-gray-700 max-w-2xl">
                                A smart portal for tracking student performance, attendance, and academic progress with real-time insights.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                                    <Link to="/login">Log In to Dashboard</Link>
                                </button>
                                <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
                                    <Link to="/about">Learn More</Link>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-md aspect-video bg-white rounded-xl shadow-lg overflow-hidden relative flex items-center justify-center">
                                <div className="w-32 h-32 flex items-center justify-center bg-white text-blue-600 text-2xl font-bold rounded-full shadow-md animate-pulse">
                                    CC
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-16 px-6 transition-opacity duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-semibold text-center mb-12">College Companion Features</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="shadow-md hover:shadow-lg transition-shadow bg-white p-6 rounded-lg">
                            <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                                <FaChartLine className="text-blue-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Performance Overview</h3>
                            <p className="text-gray-600">Track academic performance and semester-wise CGPA to identify students who need support.</p>
                            <Link to="/login" className="inline-flex items-center mt-4 text-blue-500 font-medium">
                                View Insights
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="shadow-md hover:shadow-lg transition-shadow bg-white p-6 rounded-lg">
                            <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                                <FaUserCheck className="text-blue-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Attendance & Fee Status</h3>
                            <p className="text-gray-600">Easily monitor attendance and fee payment status of students under your guidance.</p>
                            <Link to="/login" className="inline-flex items-center mt-4 text-blue-500 font-medium">
                                Check Students
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="shadow-md hover:shadow-lg transition-shadow bg-white p-6 rounded-lg">
                            <div className="rounded-full w-12 h-12 bg-blue-100 flex items-center justify-center mb-4">
                                <FaUserTie className="text-blue-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Faculty Dashboard</h3>
                            <p className="text-gray-600">Log in to your dashboard to view details of your mentees and provide academic oversight.</p>
                            <Link to="/login" className="inline-flex items-center mt-4 text-blue-500 font-medium">
                                Go to Dashboard
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chatbot Button */}
            <ChatbotButton />
        </div>
    );
};

export default Home;
