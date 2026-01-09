import { motion } from 'framer-motion'
import { Trophy, Skull, PartyPopper, Frown } from 'lucide-react'

export default function ProfessorStats({ subjects }) {
    if (subjects.length < 2) return null

    // Calculate stats
    const sortedByAttendance = [...subjects].sort((a, b) => {
        const aPct = a.attendance.total === 0 ? 0 : a.attendance.attended / a.attendance.total
        const bPct = b.attendance.total === 0 ? 0 : b.attendance.attended / b.attendance.total
        return bPct - aPct
    })

    const bestSubject = sortedByAttendance[0]
    const worstSubject = sortedByAttendance[sortedByAttendance.length - 1]

    // Mock data for "Cancelled" since we didn't track it explicitly in MVP
    // In a real app, we'd track 'cancelled' count in the subject object
    // For now, let's just show the attendance extremes which is real data

    return (
        <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold text-white px-2">Professor Stats 🏆</h2>

            <div className="grid grid-cols-2 gap-3">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass p-4 rounded-2xl border-l-4 border-green-500"
                >
                    <div className="flex items-center gap-2 mb-2 text-green-400">
                        <PartyPopper size={20} />
                        <span className="text-xs font-bold uppercase">Chillest Prof</span>
                    </div>
                    <p className="font-bold text-white truncate">{bestSubject.professor || bestSubject.name}</p>
                    <p className="text-xs text-gray-400">Highest Attendance</p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass p-4 rounded-2xl border-l-4 border-red-500"
                >
                    <div className="flex items-center gap-2 mb-2 text-red-400">
                        <Skull size={20} />
                        <span className="text-xs font-bold uppercase">The Villain</span>
                    </div>
                    <p className="font-bold text-white truncate">{worstSubject.professor || worstSubject.name}</p>
                    <p className="text-xs text-gray-400">Lowest Attendance</p>
                </motion.div>
            </div>
        </div>
    )
}
