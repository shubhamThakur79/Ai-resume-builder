'use client';

import { motion } from 'framer-motion';
import { FileText, Sparkles, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="w-full flex justify-center pb-12 pt-16 md:pb-24 lg:pb-32 xl:pb-48 bg-black text-white overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <motion.div
                        className="flex flex-col justify-center space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="space-y-2">
                            <motion.h1
                                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                Build Your Dream Resume with AI
                            </motion.h1>
                            <motion.p
                                className="max-w-[600px] text-gray-300 text-sm sm:text-base md:text-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                Create a professional, eye-catching resume in minutes with our AI-powered builder. Stand out from the crowd and land your dream job.
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-wrap gap-5"
                        >
                            <Link to={"/dashbord"}>
                                <Button size="lg" className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto">
                                    <FileText className="mr-2 h-5 w-5" />
                                    Build Your Resume Now
                                </Button>
                            </Link>
                            <Link to={"/auth/sign-in"}>
                                <Button size="lg" className="bg-white text-black hover:bg-gray-200 w-full sm:w-auto">
                                    <User className="mr-2 h-5 w-5" />
                                    Sign up
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="flex items-center justify-center mt-10 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 10,
                                    ease: 'linear',
                                    repeat: Infinity,
                                }}
                            />
                            <motion.div
                                className="absolute inset-2 bg-black rounded-full flex items-center justify-center"
                                animate={{
                                    rotate: [0, -180, -360],
                                }}
                                transition={{
                                    duration: 10,
                                    ease: 'linear',
                                    repeat: Infinity,
                                }}
                            >
                                <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
