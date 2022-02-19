import NavBar from '../NavBar/NavBar'
import Footer from '../Footer'

export default function MainLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}
