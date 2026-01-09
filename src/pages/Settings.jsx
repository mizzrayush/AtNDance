import { useAuth } from '../context/AuthContext'
import { useTimetable } from '../hooks/useTimetable'
import { useTheme } from '../context/ThemeContext'
import { useNotifications } from '../hooks/useNotifications'
import { motion } from 'framer-motion'
import { LogOut, Trash2, User, Moon, Shield, ChevronRight, Github, Bell, FileText } from 'lucide-react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function Settings() {
    const { logout, user } = useAuth()
    const { subjects } = useTimetable()
    const { theme, changeTheme } = useTheme()
    const { sendReminder } = useNotifications()

    const handleClearData = () => {
        if (confirm('Are you sure? This will delete all subjects and attendance data permanently.')) {
            localStorage.clear()
            window.location.reload()
        }
    }

    const generatePDF = () => {
        const doc = new jsPDF()

        // Header
        doc.setFontSize(20)
        doc.text("AtNDance Report", 14, 22)
        doc.setFontSize(11)
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

        // Table
        const tableData = subjects.map(s => [
            s.name,
            s.professor || '-',
            `${s.attendance.attended}/${s.attendance.total}`,
            `${s.attendance.total === 0 ? 0 : Math.round((s.attendance.attended / s.attendance.total) * 100)}%`
        ])

        doc.autoTable({
            startY: 40,
            head: [['Subject', 'Professor', 'Attendance', '%']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [99, 102, 241] } // Indigo 500
        })

        doc.save('attendance-report.pdf')
    }

    const SettingSection = ({ title, children }) => (
        <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">{title}</h2>
            <div className="glass rounded-2xl overflow-hidden">
                {children}
            </div>
        </div>
    )

    const SettingItem = ({ icon: Icon, label, value, onClick, isDestructive }) => (
        <button
            onClick={onClick}
            className={`w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors ${isDestructive ? 'text-red-400' : 'text-white'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDestructive ? 'bg-red-500/10' : 'bg-white/5'}`}>
                    <Icon size={20} />
                </div>
                <span className="font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-sm text-gray-400">{value}</span>}
                <ChevronRight size={16} className="text-gray-600" />
            </div>
        </button>
    )

    return (
        <div className="p-6 pb-32">
            <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

            {/* Profile Card */}
            <div className="glass p-6 rounded-2xl mb-8 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                    {user?.email?.[0].toUpperCase() || 'G'}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">Guest Student</h2>
                    <p className="text-sm text-gray-400">Offline Account</p>
                </div>
            </div>

            <SettingSection title="App Settings">
                <div className="p-4 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white/5">
                            <Moon size={20} className="text-white" />
                        </div>
                        <span className="font-medium text-white">Theme</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { id: 'default', color: '#6366f1', label: 'Dark' },
                            { id: 'cyberpunk', color: '#facc15', label: 'Cyber' },
                            { id: 'oled', color: '#000000', label: 'OLED' },
                            { id: 'light', color: '#ffffff', label: 'Light' },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => changeTheme(t.id)}
                                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${theme === t.id ? 'bg-white/10 ring-2 ring-primary' : 'hover:bg-white/5'
                                    }`}
                            >
                                <div
                                    className="w-8 h-8 rounded-full border border-white/10"
                                    style={{ backgroundColor: t.color }}
                                />
                                <span className="text-[10px] text-gray-400 uppercase font-bold">{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <SettingItem
                    icon={Shield}
                    label="Privacy"
                    value="Local Only"
                />
                <SettingItem
                    icon={Bell}
                    label="Test Notification"
                    onClick={() => sendReminder("Hey! 👋", "This is how your daily attendance reminder will look.")}
                />
            </SettingSection>

            <SettingSection title="Data & Storage">
                <SettingItem
                    icon={FileText}
                    label="Export Report (PDF)"
                    onClick={generatePDF}
                />
                <SettingItem
                    icon={Trash2}
                    label="Clear All Data"
                    onClick={handleClearData}
                    isDestructive
                />
            </SettingSection>

            <SettingSection title="About">
                <SettingItem
                    icon={Github}
                    label="Version"
                    value="v1.0.0 (Beta)"
                />
            </SettingSection>

            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-red-400 font-semibold flex items-center justify-center gap-2 transition-colors border border-white/5"
            >
                <LogOut size={20} />
                Log Out
            </motion.button>

            <p className="text-center text-xs text-gray-600 mt-8">
                Made with ❤️ by AtNDance Team
            </p>
        </div>
    )
}
