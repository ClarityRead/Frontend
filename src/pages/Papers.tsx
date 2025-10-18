import { useState, useEffect } from 'react'
import axios from 'axios'
import { domains } from '../constants'

function Papers() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDomain, setSelectedDomain] = useState('All')
    const [selectedSubdomain, setSelectedSubdomain] = useState('All')
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
    const [loading, setLoading] = useState(true)
    const [papers, setPapers] = useState<Paper[]>([])
    const [filteredPapers, setFilteredPapers] = useState<Paper[]>([])
    const [domainOptions, setDomainOptions] = useState<string[]>(['All'])
    const [subdomainOptions, setSubdomainOptions] = useState<string[]>(['All'])
    const [pagination, setPagination] = useState({
        has_next: false,
        has_previous: false,
        page: 1,
        page_size: 20,
        total_count: 0,
        total_pages: 0
    })
    const [currentPage, setCurrentPage] = useState(1)

    const fetchPapers = async (search = '', domain = '', subdomain = '', page = 1) => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (search) params.append('search', search)
            if (domain && domain !== 'All') params.append('domain', domain)
            if (subdomain && subdomain !== 'All') params.append('subdomain', subdomain)
            params.append('page', page.toString())

            const results = await axios.get(`http://localhost:8000/api/papers/?${params.toString()}`)
            console.log(results);
            const papersData = results.data.results;
            const paginationData = results.data.pagination;

            // Ensure papersData is an array
            const papersArray = Array.isArray(papersData) ? papersData : []

            setPapers(papersArray)
            setFilteredPapers(papersArray)
            setPagination(paginationData)
            setCurrentPage(page)

            // Set domain options from constants
            const allDomains = ['All', ...Object.keys(domains)]
            setDomainOptions(allDomains)

            // Set subdomain options based on selected domain
            if (selectedDomain && selectedDomain !== 'All' && domains[selectedDomain]) {
                const subdomains = ['All', ...domains[selectedDomain]]
                setSubdomainOptions(subdomains)
            } else {
                setSubdomainOptions(['All'])
            }
        } catch (e) {
            console.log('Error fetching papers:', e)
            // Set empty arrays on error
            setPapers([])
            setFilteredPapers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPapers()
    }, [])

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(1) // Reset to first page when searching
            fetchPapers(searchTerm, selectedDomain, selectedSubdomain, 1)
        }, 500) // 500ms delay

        return () => clearTimeout(timeoutId)
    }, [searchTerm, selectedDomain, selectedSubdomain])

    // Handle page changes
    const handlePageChange = (page: number) => {
        fetchPapers(searchTerm, selectedDomain, selectedSubdomain, page)
    }

    // Update subdomain options when domain changes
    useEffect(() => {
        if (selectedDomain && selectedDomain !== 'All' && domains[selectedDomain]) {
            const subdomains = ['All', ...domains[selectedDomain]]
            setSubdomainOptions(subdomains)
            setSelectedSubdomain('All') // Reset subdomain when domain changes
        } else {
            setSubdomainOptions(['All'])
            setSelectedSubdomain('All')
        }
    }, [selectedDomain])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading papers...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Research Papers</h1>
                        <button
                            onClick={() => (window as any).navigate('/')}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            ← Back to Introduction
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search papers by title, author, or summary..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:w-48">
                            <select
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                {domainOptions.map(domain => (
                                    <option key={domain} value={domain}>{domain}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:w-48">
                            <select
                                value={selectedSubdomain}
                                onChange={(e) => setSelectedSubdomain(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                disabled={selectedDomain === 'All'}
                            >
                                {subdomainOptions.map(subdomain => (
                                    <option key={subdomain} value={subdomain}>{subdomain}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Papers Grid */}
                <div className="grid gap-6">
                    {filteredPapers && filteredPapers.length > 0 ? filteredPapers.map(paper => (
                        <div key={paper.paper_id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{paper.title}</h3>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">Author:</span> {paper.author}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">Published:</span> {paper.published}
                                    </p>
                                </div>
                                <div className="ml-4 flex flex-col gap-2">
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {paper.domain}
                                    </span>
                                    {paper.subdomain && (
                                        <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                                            {paper.subdomain}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4 leading-relaxed">{paper.summary}</p>

                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    {paper.pdf_link && (
                                        <a
                                            href={paper.pdf_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                        >
                                            View PDF
                                        </a>
                                    )}
                                    {paper.reference_link && (
                                        <a
                                            href={paper.reference_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                                        >
                                            Reference
                                        </a>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedPaper(paper)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Analyze with AI
                                    </button>
                                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>

                {filteredPapers && filteredPapers.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No papers found matching your search criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                {pagination.total_pages > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {((currentPage - 1) * pagination.page_size) + 1} to {Math.min(currentPage * pagination.page_size, pagination.total_count)} of {pagination.total_count} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!pagination.has_previous}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {/* Page numbers */}
                            <div className="flex space-x-1">
                                {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                                    let pageNum;
                                    if (pagination.total_pages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= pagination.total_pages - 2) {
                                        pageNum = pagination.total_pages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === pageNum
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!pagination.has_next}
                                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Paper Analysis Modal */}
            {selectedPaper && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">AI Analysis</h2>
                                <button
                                    onClick={() => setSelectedPaper(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedPaper.title}</h3>
                                <p className="text-gray-600">by {selectedPaper.author}</p>
                                <p className="text-sm text-gray-500 mt-1">{selectedPaper.domain} • {selectedPaper.published}</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">AI Summary</h4>
                                    <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                                        This paper presents research in {selectedPaper.domain.toLowerCase()},
                                        {selectedPaper.subdomain && ` specifically in ${selectedPaper.subdomain.toLowerCase()},`}
                                        published in {selectedPaper.published}. The research contributes to the field with
                                        practical insights and findings that could be valuable for further study and application.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Research Domain</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                            {selectedPaper.domain}
                                        </span>
                                        {selectedPaper.subdomain && (
                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {selectedPaper.subdomain}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Research Impact</h4>
                                    <p className="text-gray-700">
                                        This research contributes to the growing body of knowledge in {selectedPaper.domain.toLowerCase()}
                                        and has potential applications in academic research, educational technology, and practical implementations.
                                        The findings could influence future studies and real-world applications in the field.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedPaper(null)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                    Ask Questions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Papers
