import { useState } from 'react'
import { useTimetable } from '../hooks/useTimetable'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

export default function Simulator() {
    const { subjects } = useTimetable()
    const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '')
    const [simulationDays, setSimulationDays] = useState([]) // Array of 'attend' | 'skip'

    const selectedSubject = subjects.find(s => s.id === selectedSubjectId)

    // Simulation Logic
    const currentAttended = selectedSubject?.attendance.attended || 0
    const currentTotal = selectedSubject?.attendance.total || 0

    const simulatedAttended = currentAttended + simulationDays.filter(d => d === 'attend').length
    const simulatedTotal = currentTotal + simulationDays.length

    const currentPct = currentTotal === 0 ? 0 : Math.round((currentAttended / currentTotal) * 100)
    const simulatedPct = simulatedTotal === 0 ? 0 : Math.round((simulatedAttended / simulatedTotal) * 100)
    const target = selectedSubject?.targetAttendance || 75

    const addSimulation = (type) => {
        setSimulationDays([...simulationDays, type])
    }

    const resetSimulation = () => {
        setSimulationDays([])
    }

    if (subjects.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-400">Add subjects first to use the simulator.</p>
            </div>
        )
    }

    return (
        <div className="p-6 pb-32">
            <h1 className="text-2xl font-bold text-white mb-6">Bunk Simulator 🔮</h1>

            {/* Subject Selector */}
            <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2">Select Subject</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {subjects.map(subject => (
                        <button
                            key={subject.id}
                            onClick={() => {
                                setSelectedSubjectId(subject.id)
                                resetSimulation()
                            }}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl border transition-all ${selectedSubjectId === subject.id
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {subject.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Simulation Area */}
            <div className="glass p-6 rounded-3xl mb-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Current</p>
                        <p className={`text-3xl font-bold ${currentPct >= target ? 'text-green-400' : 'text-red-400'}`}>
                            {currentPct}%
                        </p>
                    </div>
                    <ArrowRight className="text-gray-500" />
                    <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Projected</p>
                        <motion.p
                            key={simulatedPct}
                            initial={{ scale: 1.5, color: '#fff' }}
                            animate={{ scale: 1, color: simulatedPct >= target ? '#4ade80' : '#f87171' }}
                            className="text-3xl font-bold"
                        >
                            {simulatedPct}%
                        </motion.p>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm text-center text-gray-400 mb-4">
                        What if I...
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => addSimulation('attend')}
                            className="p-4 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors font-medium"
                        >
                            Attend Next Class
                        </button>
                        <button
                            onClick={() => addSimulation('skip')}
                            className="p-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors font-medium"
                        >
                            Skip Next Class
                        </button>
                    </div>

                    {simulationDays.length > 0 && (
                        <button
                            onClick={resetSimulation}
                            className="w-full py-2 text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            Reset Simulation
                        </button>
                    )}
                </div>
            </div>

            {/* Simulation History */}
            {simulationDays.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Scenario</h3>
                    <div className="flex flex-wrap gap-2">
                        {simulationDays.map((type, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${type === 'attend' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                    }`}
                            >
                                {type === 'attend' ? 'Attended' : 'Skipped'}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
