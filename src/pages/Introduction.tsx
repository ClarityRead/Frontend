import { Link } from "react-router-dom";

function Introduction() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        ClarityRead
                        <span className="block text-3xl md:text-4xl text-indigo-600 mt-2">
                            Student Document Assistant
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Transform complex academic papers into understandable insights with the power of AI.
                        Make research accessible, learning efficient, and knowledge discovery effortless.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/papers"><button
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Browse Papers
                        </button></Link>
                        <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        How ClarityRead Helps Students
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Feature 1 */}
                        <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Summarization</h3>
                            <p className="text-gray-600">
                                Get concise, accurate summaries of complex academic papers tailored to your level of understanding.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Concept Explanation</h3>
                            <p className="text-gray-600">
                                Break down complex concepts with clear explanations, examples, and analogies that make learning stick.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Insights</h3>
                            <p className="text-gray-600">
                                Ask questions about any paper and get instant, accurate answers powered by advanced AI technology.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        How It Works
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Paper</h3>
                                <p className="text-gray-600">Upload any academic paper in PDF format or paste the text directly.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
                                <p className="text-gray-600">Our AI processes the content and identifies key concepts and themes.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Insights</h3>
                                <p className="text-gray-600">Receive summaries, explanations, and answers to your questions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-600 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Learning?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who are already using ClarityRead to make academic research more accessible and understandable.
                    </p>
                    <button
                        onClick={() => (window as any).navigate('/papers')}
                        className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Start Now
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-400">
                        © 2024 ClarityRead - Student Document Assistant. Empowering students with AI-powered academic insights.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Introduction;