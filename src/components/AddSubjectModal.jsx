import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'

const COLORS = [
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#22c55e', // Green
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#ec4899', // Pink
]

export default function AddSubjectModal({ isOpen, onClose, onAdd }) {
    const [name, setName] = useState('')
    const [professor, setProfessor] = useState('')
    const [semesterTotal, setSemesterTotal] = useState('')
    const [targetAttendance, setTargetAttendance] = useState('75')
    const [selectedColor, setSelectedColor] = useState(COLORS[5])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name) return

        onAdd({
            name,
            professor,
            semesterTotal,
            targetAttendance,
            color: selectedColor
        })

        // Reset form
        setName('')
        setProfessor('')
        setSemesterTotal('')
        setTargetAttendance('75')
        setSelectedColor(COLORS[5])
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[15%] max-w-md mx-auto bg-[#1e293b] rounded-2xl p-6 z-50 shadow-2xl border border-white/10 max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Add New Subject</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Subject Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Data Structures"
                                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Professor (Optional)</label>
                                <input
                                    type="text"
                                    value={professor}
                                    onChange={(e) => setProfessor(e.target.value)}
                                    placeholder="e.g. Dr. Smith"
                                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Total Classes</label>
                                    <input
                                        type="number"
                                        value={semesterTotal}
                                        onChange={(e) => setSemesterTotal(e.target.value)}
                                        placeholder="e.g. 40"
                                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Target %</label>
                                    <input
                                        type="number"
                                        value={targetAttendance}
                                        onChange={(e) => setTargetAttendance(e.target.value)}
                                        placeholder="75"
                                        className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Color Tag</label>
                                <div className="flex flex-wrap gap-3">
                                    {COLORS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full transition-transform ${selectedColor === color ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!name}
                                className="w-full bg-primary hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={20} />
                                Add Subject
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
