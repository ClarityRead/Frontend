import './App.css'
import { useState, useEffect } from 'react'
import Introduction from './pages/Introduction'
import Papers from './pages/Papers'

function App() {
  const [currentPage, setCurrentPage] = useState('introduction')

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname
      if (path === '/papers') {
        setCurrentPage('papers')
      } else {
        setCurrentPage('introduction')
      }
    }

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)
    handleRouteChange() // Check initial route

    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  // Override window.location.href to use our routing
  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    if (path === '/papers') {
      setCurrentPage('papers')
    } else {
      setCurrentPage('introduction')
    }
  }

  // Make navigate available globally
  useEffect(() => {
    (window as any).navigate = navigate
  }, [])

  return (
    <>
      {currentPage === 'introduction' && <Introduction />}
      {currentPage === 'papers' && <Papers />}
    </>
  )
}

export default App