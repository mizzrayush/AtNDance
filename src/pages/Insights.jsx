import { useTimetable } from '../hooks/useTimetable'
import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import ProfessorStats from '../components/ProfessorStats'

export default function Insights() {
    const { subjects } = useTimetable()

    const calculateStatus = (attended, total) => {
        if (total === 0) return { status: 'neutral', message: 'No classes yet' }

        const percentage = attended / total
        const target = 0.75

        if (percentage >= target) {
            // Safe to bunk calculation
            // A / (T + X) >= 0.75  =>  X <= (A/0.75) - T
            const safeToBunk = Math.floor((attended / target) - total)
            return {
                status: 'good',
                canBunk: safeToBunk,
                message: safeToBunk > 0
                    ? `You can safely skip ${safeToBunk} more classes!`
                    : 'You are on track, but cannot skip any classes yet.'
            }
        } else {
            // Need to attend calculation
            // (A + Y) / (T + Y) >= 0.75  =>  Y >= (0.75T - A) / 0.25
            const needToAttend = Math.ceil(((target * total) - attended) / (1 - target))
            return {
                status: 'bad',
                needToAttend,
                message: `Attend next ${needToAttend} classes to reach 75%.`
            }
        }
    }

    return (
        <div className="p-6 pb-32">
            <h1 className="text-2xl font-bold text-white mb-6">Insights</h1>

            <ProfessorStats subjects={subjects} />

            <div className="space-y-4">
                {subjects.length === 0 ? (
                    <div className="glass p-8 rounded-2xl text-center">
                        <p className="text-gray-400">Add subjects to see insights.</p>
                    </div>
                ) : (
                    subjects.map(subject => {
                        const { attended, total } = subject.attendance
                        const percentage = total === 0 ? 0 : Math.round((attended / total) * 100)
                        const analysis = calculateStatus(attended, total)

                        return (
                            <motion.div
                                key={subject.id}
                                layout
                                className="glass p-5 rounded-2xl relative overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 left-0 w-1.5 h-full"
                                    style={{ backgroundColor: subject.color }}
                                />

                                <div className="pl-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-white">{subject.name}</h3>
                                        <span className={`text-xl font-bold ${percentage >= 75 ? 'text-green-400' : 'text-red-400'}`}>
                                            {percentage}%
                                        </span>
                                    </div>

                                    <div className={`p-3 rounded-xl flex items-start gap-3 ${analysis.status === 'good' ? 'bg-green-500/10 text-green-400' :
                                        analysis.status === 'bad' ? 'bg-red-500/10 text-red-400' :
                                            'bg-gray-500/10 text-gray-400'
                                        }`}>
                                        {analysis.status === 'good' && <CheckCircle className="shrink-0 mt-0.5" size={18} />}
                                        {analysis.status === 'bad' && <AlertTriangle className="shrink-0 mt-0.5" size={18} />}
                                        {analysis.status === 'neutral' && <TrendingUp className="shrink-0 mt-0.5" size={18} />}

                                        <p className="text-sm font-medium leading-tight">
                                            {analysis.message}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
