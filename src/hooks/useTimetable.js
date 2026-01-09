import { useState, useEffect } from 'react'

const STORAGE_KEYS = {
    SUBJECTS: 'atndance_subjects',
    TIMETABLE: 'atndance_timetable',
}

const DEFAULT_SUBJECTS = []
const DEFAULT_TIMETABLE = []

export function useTimetable() {
    const [subjects, setSubjects] = useState([])
    const [timetable, setTimetable] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load data from local storage
        const storedSubjects = localStorage.getItem(STORAGE_KEYS.SUBJECTS)
        const storedTimetable = localStorage.getItem(STORAGE_KEYS.TIMETABLE)

        if (storedSubjects) setSubjects(JSON.parse(storedSubjects))
        if (storedTimetable) setTimetable(JSON.parse(storedTimetable))

        setLoading(false)
    }, [])

    const saveSubjects = (newSubjects) => {
        setSubjects(newSubjects)
        localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(newSubjects))
    }

    const saveTimetable = (newTimetable) => {
        setTimetable(newTimetable)
        localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(newTimetable))
    }

    const addSubject = (subject) => {
        const newSubject = {
            id: crypto.randomUUID(),
            attendance: { total: 0, attended: 0, cancelled: 0 },
            semesterTotal: subject.semesterTotal ? parseInt(subject.semesterTotal) : null,
            targetAttendance: subject.targetAttendance ? parseInt(subject.targetAttendance) : 75,
            ...subject
        }
        const newSubjects = [...subjects, newSubject]
        saveSubjects(newSubjects)
        return newSubject
    }

    const deleteSubject = (id) => {
        const newSubjects = subjects.filter(s => s.id !== id)
        saveSubjects(newSubjects)
        // Also remove from timetable
        const newTimetable = timetable.filter(t => t.subjectId !== id)
        saveTimetable(newTimetable)
    }

    const addToTimetable = (entry) => {
        const newEntry = {
            id: crypto.randomUUID(),
            ...entry
        }
        const newTimetable = [...timetable, newEntry]
        saveTimetable(newTimetable)
    }

    const removeFromTimetable = (id) => {
        const newTimetable = timetable.filter(t => t.id !== id)
        saveTimetable(newTimetable)
    }

    const markAttendance = (subjectId, status) => {
        const newSubjects = subjects.map(subject => {
            if (subject.id === subjectId) {
                const newStats = { ...subject.attendance }
                // Ensure cancelled exists for legacy data
                if (newStats.cancelled === undefined) newStats.cancelled = 0

                if (status === 'present') {
                    newStats.total += 1
                    newStats.attended += 1
                } else if (status === 'absent') {
                    newStats.total += 1
                } else if (status === 'cancelled') {
                    newStats.cancelled += 1
                }

                return { ...subject, attendance: newStats }
            }
            return subject
        })
        saveSubjects(newSubjects)
    }

    const getDaySchedule = (day) => {
        return timetable
            .filter(t => t.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map(entry => {
                const subject = subjects.find(s => s.id === entry.subjectId)
                return { ...entry, subject }
            })
    }

    return {
        subjects,
        timetable,
        loading,
        addSubject,
        deleteSubject,
        addToTimetable,
        removeFromTimetable,
        getDaySchedule,
        markAttendance
    }
}
