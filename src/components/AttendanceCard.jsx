import { motion } from 'framer-motion'
import { Check, X, Ban } from 'lucide-react'
import { cn } from '../lib/utils'

export default function AttendanceCard({ subject, onMark }) {
    const percentage = subject.attendance.total === 0
        ? 0
        : Math.round((subject.attendance.attended / subject.attendance.total) * 100)

    const getStatusColor = (pct) => {
        const target = subject.targetAttendance || 75
        if (pct >= target) return 'text-green-400'
        if (pct >= target - 15) return 'text-yellow-400'
        return 'text-red-400'
    }

    return (
        <motion.div
            layout
            className="glass p-5 rounded-2xl relative overflow-hidden"
        >
            <div
                className="absolute top-0 left-0 w-1.5 h-full"
                style={{ backgroundColor: subject.color }}
            />

            <div className="pl-4">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-white">{subject.name}</h3>
                        <p className="text-sm text-gray-400">{subject.professor || 'No Professor'}</p>
                    </div>
                    <div className="text-right">
                        <span className={cn("text-2xl font-bold", getStatusColor(percentage))}>
                            {percentage}%
                        </span>
                        <p className="text-xs text-gray-500">
                            {subject.attendance.attended}/{subject.attendance.total} Classes
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => onMark(subject.id, 'present')}
                        className="flex-1 py-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 flex items-center justify-center gap-1 transition-colors"
                    >
                        <Check size={18} />
                        <span className="text-sm font-medium">Present</span>
                    </button>

                    <button
                        onClick={() => onMark(subject.id, 'absent')}
                        className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-1 transition-colors"
                    >
                        <X size={18} />
                        <span className="text-sm font-medium">Absent</span>
                    </button>

                    <button
                        onClick={() => onMark(subject.id, 'cancelled')}
                        className="flex-1 py-2 rounded-xl bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border border-gray-500/20 flex items-center justify-center gap-1 transition-colors"
                    >
                        <Ban size={18} />
                        <span className="text-sm font-medium">Cancel</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
