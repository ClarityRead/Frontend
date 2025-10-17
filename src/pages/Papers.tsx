import { useState, useEffect } from 'react'
import axios from 'axios'

interface Paper {
    id: number
    title: string
    authors: string[]
    abstract: string
    journal: string
    year: number
    doi: string
    keywords: string[]
    category: string
}

const dummyPapers: Paper[] = [
    {
        id: 1,
        title: "Deep Learning Approaches for Natural Language Processing in Academic Text Analysis",
        authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Emily Watson"],
        abstract: "This paper presents novel deep learning methodologies for analyzing academic texts, focusing on transformer-based architectures for improved understanding of complex scientific literature. Our approach achieves 94% accuracy in concept extraction and 89% in summarization tasks.",
        journal: "Journal of Artificial Intelligence Research",
        year: 2024,
        doi: "10.1000/ai.2024.001",
        keywords: ["Deep Learning", "NLP", "Academic Text", "Transformers"],
        category: "Machine Learning"
    },
    {
        id: 2,
        title: "The Impact of AI-Assisted Learning on Student Comprehension in Higher Education",
        authors: ["Dr. James Thompson", "Prof. Lisa Park", "Dr. Robert Kim"],
        abstract: "We investigate how AI-powered tools affect student learning outcomes in university settings. Our longitudinal study of 2,500 students shows significant improvements in comprehension scores and reduced study time when using AI-assisted learning platforms.",
        journal: "Educational Technology Review",
        year: 2024,
        doi: "10.1000/etr.2024.002",
        keywords: ["AI Learning", "Education", "Student Outcomes", "Technology"],
        category: "Education"
    },
    {
        id: 3,
        title: "Automated Citation Analysis and Research Impact Assessment Using Machine Learning",
        authors: ["Dr. Maria Garcia", "Prof. David Lee", "Dr. Anna Smith"],
        abstract: "This research introduces an automated system for analyzing citation patterns and assessing research impact. The system uses ensemble learning methods to predict paper influence and identify emerging research trends across multiple disciplines.",
        journal: "Information Processing & Management",
        year: 2023,
        doi: "10.1000/ipm.2023.003",
        keywords: ["Citation Analysis", "Research Impact", "Machine Learning", "Bibliometrics"],
        category: "Information Science"
    },
    {
        id: 4,
        title: "Blockchain Technology in Academic Publishing: Ensuring Research Integrity and Transparency",
        authors: ["Dr. Alex Johnson", "Prof. Sarah Wilson", "Dr. Mark Brown"],
        abstract: "We propose a blockchain-based system for academic publishing that ensures research integrity, prevents plagiarism, and provides transparent peer review processes. The system has been tested with over 1,000 research papers across various disciplines.",
        journal: "Nature Digital Innovation",
        year: 2023,
        doi: "10.1000/ndi.2023.004",
        keywords: ["Blockchain", "Academic Publishing", "Research Integrity", "Transparency"],
        category: "Computer Science"
    },
    {
        id: 5,
        title: "Cognitive Load Theory and Its Application in AI-Powered Educational Tools",
        authors: ["Dr. Jennifer Davis", "Prof. Kevin Zhang", "Dr. Rachel Green"],
        abstract: "This paper explores how cognitive load theory can be applied to design more effective AI-powered educational tools. We present a framework for optimizing information presentation and reducing cognitive overload in digital learning environments.",
        journal: "Cognitive Science Quarterly",
        year: 2024,
        doi: "10.1000/csq.2024.005",
        keywords: ["Cognitive Load", "AI Education", "Learning Design", "Human-Computer Interaction"],
        category: "Psychology"
    }
]

function Papers() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)

    useEffect(() => {
        axios.get('http://localhost:8000/api/papers/').then((response: any) => {
            console.log(response)
        })
    }, [])

    const categories = ['All', ...Array.from(new Set(dummyPapers.map(paper => paper.category)))]

    const filteredPapers = dummyPapers.filter(paper => {
        const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
        const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory
        return matchesSearch && matchesCategory
    })

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
                                placeholder="Search papers by title, author, or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:w-48">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Papers Grid */}
                <div className="grid gap-6">
                    {filteredPapers.map(paper => (
                        <div key={paper.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{paper.title}</h3>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">Authors:</span> {paper.authors.join(', ')}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">Journal:</span> {paper.journal} ({paper.year})
                                    </p>
                                </div>
                                <div className="ml-4">
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {paper.category}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-4 leading-relaxed">{paper.abstract}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {paper.keywords.map(keyword => (
                                    <span key={keyword} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                                        {keyword}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">DOI: {paper.doi}</p>
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
                    ))}
                </div>

                {filteredPapers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No papers found matching your search criteria.</p>
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
                                <p className="text-gray-600">by {selectedPaper.authors.join(', ')}</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">AI Summary</h4>
                                    <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                                        This paper presents innovative research in {selectedPaper.category.toLowerCase()}, focusing on {selectedPaper.keywords[0].toLowerCase()}.
                                        The authors demonstrate significant contributions to the field with practical applications and measurable results.
                                        The methodology shows promise for future research and real-world implementation.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Key Concepts</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPaper.keywords.map(keyword => (
                                            <span key={keyword} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Research Impact</h4>
                                    <p className="text-gray-700">
                                        This research contributes to the growing body of knowledge in {selectedPaper.category.toLowerCase()} and has potential applications
                                        in educational technology, research methodology, and academic publishing. The findings could influence future studies and
                                        practical implementations in the field.
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
