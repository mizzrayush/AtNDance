import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'

export default function Layout() {
    return (
        <div className="min-h-screen pb-24 bg-dark text-white font-sans selection:bg-primary/30">
            <div className="max-w-md mx-auto min-h-screen relative">
                <Outlet />
                <BottomNav />
            </div>
        </div>
    )
}
