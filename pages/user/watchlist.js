import MainLayout from '../../components/Layouts/MainLayout'
import { protectedRoute } from '../../components/context/ProtectedRoute'
function watchlist() {
    return (
        <MainLayout>
            <div className="min-h-screen bg-neutral-800">

            </div>
        </MainLayout>
    )
}

export default protectedRoute(watchlist)
