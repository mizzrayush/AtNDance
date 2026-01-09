import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { UserCircle2, ArrowRight } from 'lucide-react'

export default function Login() {
    const { loginAsGuest } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleGuestLogin = async () => {
        setIsLoading(true)
        // Simulate a small delay for better UX
        setTimeout(() => {
            loginAsGuest()
            navigate('/')
        }, 800)
    }

    return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                        AtNDance
                    </h1>
                    <p className="text-gray-400">Your college life, sorted.</p>
                </div>

                <div className="glass p-8 rounded-3xl space-y-6 shadow-2xl border border-white/10">
                    <div className="space-y-4">
                        <button
                            disabled={true}
                            className="w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed flex items-center justify-center gap-3 font-medium"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google (Soon)
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-dark px-2 text-gray-500">Or continue as</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGuestLogin}
                            disabled={isLoading}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Guest Student <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        By continuing, you agree to our Terms & Privacy Policy.
                        <br />
                        Guest data is saved locally on your device.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
