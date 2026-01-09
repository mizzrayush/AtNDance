import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { useTimetable } from '../hooks/useTimetable'
import AddSubjectModal from '../components/AddSubjectModal'
import { cn } from '../lib/utils'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Timetable() {
    const { subjects, addSubject, timetable, addToTimetable, removeFromTimetable, getDaySchedule } = useTimetable()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeDayIndex, setActiveDayIndex] = useState(0) // 0 = Monday
    const [isEditMode, setIsEditMode] = useState(false)

    const activeDay = DAYS[activeDayIndex]
    const daySchedule = getDaySchedule(activeDay)

    const handleAddClass = (subjectId) => {
        // Simple prompt for time (MVP) - In real app, use a proper time picker modal
        const time = prompt('Enter start time (e.g. 10:00 AM):')
        if (!time) return

        addToTimetable({
            day: activeDay,
            startTime: time,
            subjectId,
            type: 'Lecture'
        })
    }

    return (
        <div className="p-6 pb-32">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Timetable</h1>
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={cn(
                        "text-sm px-3 py-1 rounded-full border transition-colors",
                        isEditMode ? "bg-red-500/20 text-red-400 border-red-500/50" : "bg-white/5 text-gray-400 border-white/10"
                    )}
                >
                    {isEditMode ? 'Done' : 'Edit'}
                </button>
            </header>

            {/* Day Selector */}
            <div className="flex items-center justify-between mb-8 bg-white/5 p-2 rounded-2xl">
                <button
                    onClick={() => setActiveDayIndex(prev => (prev - 1 + DAYS.length) % DAYS.length)}
                    className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <span className="font-semibold text-lg w-32 text-center">{activeDay}</span>
                <button
                    onClick={() => setActiveDayIndex(prev => (prev + 1) % DAYS.length)}
                    className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Schedule List */}
            <div className="space-y-4">
                {daySchedule.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No classes scheduled for {activeDay}</p>
                        {isEditMode && (
                            <p className="text-sm text-gray-600">Tap a subject below to add it here</p>
                        )}
                    </div>
                ) : (
                    daySchedule.map((entry) => (
                        <motion.div
                            key={entry.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass p-4 rounded-xl flex items-center gap-4 relative group"
                        >
                            <div
                                className="w-1.5 h-12 rounded-full"
                                style={{ backgroundColor: entry.subject?.color || '#ccc' }}
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-white">{entry.subject?.name || 'Unknown Subject'}</h3>
                                <p className="text-sm text-gray-400">{entry.startTime} • {entry.type}</p>
                            </div>

                            {isEditMode && (
                                <button
                                    onClick={() => removeFromTimetable(entry.id)}
                                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* Subjects Quick Add (Only in Edit Mode) */}
            {isEditMode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 pt-8 border-t border-white/10"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-400">Tap to add to {activeDay}</h3>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-primary text-sm font-medium flex items-center gap-1"
                        >
                            <Plus size={16} /> New Subject
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {subjects.map(subject => (
                            <button
                                key={subject.id}
                                onClick={() => handleAddClass(subject.id)}
                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left transition-colors flex items-center gap-3"
                            >
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: subject.color }}
                                />
                                <span className="text-sm font-medium truncate">{subject.name}</span>
                            </button>
                        ))}

                        {subjects.length === 0 && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="col-span-2 p-4 border-2 border-dashed border-white/10 rounded-xl text-gray-500 text-sm hover:border-primary/50 hover:text-primary transition-colors"
                            >
                                Create your first subject
                            </button>
                        )}
                    </div>
                </motion.div>
            )}

            <AddSubjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addSubject}
            />
        </div>
    )
}
