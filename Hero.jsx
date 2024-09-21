import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="bg-gradient-to-r  bg-purple-600 h-screen from-indigo-500 to-purple-600 min-h-screen flex flex-col justify-center items-center text-center p-6">
            <motion.h1
                className="text-white text-2xl md:text-4xl font-extrabold drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Ai Resume Builder
            </motion.h1>
            <motion.p
                className="mt-4 text-black text-lg opacity-75"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Revamp your resume effortlessly with our AI-driven resume builder.
            </motion.p>
            <motion.div
                className="mt-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <img
                    aria-hidden="true"
                    alt="AI resume builder illustration"
                    src="https://img.freepik.com/free-photo/view-robot-human-businessperson_23-2150911959.jpg?ga=GA1.1.785720697.1706798610&semt=ais_hybrid"
                    className="rounded-lg shadow-2xl transition-transform transform hover:scale-105 delay-500"
                />
            </motion.div>
            <motion.div
                className="mt-6 mb-4 space-x-4 gap-5 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Link to={"/auth/sign-in"}>

                    <motion.button
                    variant={"outline"}
                        className="bg-yellow-500 border  text-white hover:bg-yellow-600 px-6 py-3 rounded-full shadow-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        Get Started
                    </motion.button>
                </Link>

                <Link to={"https://github.com/shubhamThakur79/Ai-resume-builder.git"}>
                <motion.button
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-6 py-3 rounded-full shadow-lg border"
                    whileHover={{ scale: 1.05 }}
                >
                    Learn More
                </motion.button>
                </Link>
            </motion.div>
            <footer className="mt-12 text-white text-sm opacity-75">
                © 2023 Resume Builder. All rights reserved.
            </footer>
        </div>
    );
}
