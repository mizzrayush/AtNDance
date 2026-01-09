import { useEffect } from 'react'

export function useNotifications() {
    useEffect(() => {
        // Request permission on mount
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission()
        }
    }, [])

    const sendReminder = (title, body) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/vite.svg', // Placeholder icon
            })
        }
    }

    return { sendReminder }
}
