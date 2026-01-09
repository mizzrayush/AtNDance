import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Calendar, CheckCircle2, PieChart, Settings, Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const navItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Timetable', path: '/timetable' },
    { icon: CheckCircle2, label: 'Attendance', path: '/attendance' },
    { icon: Gamepad2, label: 'Sim', path: '/simulator' },
    { icon: PieChart, label: 'Insights', path: '/insights' },
    { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function BottomNav() {
    const location = useLocation()

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50">
            <nav className="glass mx-auto max-w-md rounded-2xl px-2 py-3 flex justify-around items-center shadow-2xl shadow-black/50 bg-dark/80 backdrop-blur-xl border-white/10">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative flex flex-col items-center justify-center w-12 h-12"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-primary/20 rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={24}
                                className={cn(
                                    "transition-colors duration-200 z-10",
                                    isActive ? "text-primary" : "text-gray-400"
                                )}
                            />
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
