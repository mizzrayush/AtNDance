import { useTimetable } from '../hooks/useTimetable'
import AttendanceCard from '../components/AttendanceCard'
import { Link } from 'react-router-dom'

export default function Attendance() {
    const { subjects, markAttendance } = useTimetable()

    return (
        <div className="p-6 pb-32">
            <h1 className="text-2xl font-bold text-white mb-6">Attendance</h1>

            <div className="space-y-4">
                {subjects.length === 0 ? (
                    <div className="glass p-8 rounded-2xl text-center">
                        <p className="text-gray-400 mb-4">No subjects added yet.</p>
                        <Link
                            to="/timetable"
                            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold inline-block"
                        >
                            Go to Timetable
                        </Link>
                    </div>
                ) : (
                    subjects.map((subject) => (
                        <AttendanceCard
                            key={subject.id}
                            subject={subject}
                            onMark={markAttendance}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
