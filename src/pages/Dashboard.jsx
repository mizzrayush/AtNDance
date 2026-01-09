import { motion } from 'framer-motion'
import { useTimetable } from '../hooks/useTimetable'
import AttendanceCard from '../components/AttendanceCard'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Dashboard() {
    const { subjects, getDaySchedule, markAttendance } = useTimetable()

    const todayIndex = new Date().getDay()
    const todayName = DAYS[todayIndex === 0 ? 6 : todayIndex] // Adjust if needed, JS getDay 0 is Sunday
    // Note: PRD says "Weekly recurring schedule". Assuming standard Mon-Sat.
    // Let's use the actual day name from JS Date to match our Timetable data.
    const currentDayName = DAYS[new Date().getDay()]

    const todaySchedule = getDaySchedule(currentDayName)

    // Calculate overall attendance
    const totalClasses = subjects.reduce((acc, s) => acc + s.attendance.total, 0)
    const totalAttended = subjects.reduce((acc, s) => acc + s.attendance.attended, 0)
    const overallPercentage = totalClasses === 0 ? 0 : Math.round((totalAttended / totalClasses) * 100)

    return (
        <div className="p-6 space-y-8 pb-32">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Hi, Student 👋</h1>
                    <p className="text-gray-400">Here's your attendance overview</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary" />
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass p-4 rounded-2xl"
                >
                    <p className="text-gray-400 text-sm">Overall Attendance</p>
                    <p className={`text-3xl font-bold ${overallPercentage >= 75 ? 'text-green-400' : 'text-red-400'}`}>
                        {overallPercentage}%
                    </p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass p-4 rounded-2xl"
                >
                    <p className="text-gray-400 text-sm">Total Classes</p>
                    <p className="text-3xl font-bold text-secondary">{totalClasses}</p>
                </motion.div>
            </div>

            {/* Today's Schedule / Mark Attendance */}
            <section>
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-lg font-semibold text-white">Today's Classes ({currentDayName})</h2>
                    <Link to="/timetable" className="text-primary text-sm flex items-center gap-1">
                        View Timetable <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="space-y-4">
                    {todaySchedule.length === 0 ? (
                        <div className="glass p-8 rounded-2xl text-center">
                            <p className="text-gray-400 mb-2">No classes scheduled for today! 🎉</p>
                            <Link to="/timetable" className="text-primary text-sm">Add classes to timetable</Link>
                        </div>
                    ) : (
                        todaySchedule.map((entry) => (
                            <AttendanceCard
                                key={entry.id}
                                subject={entry.subject}
                                onMark={markAttendance}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}
