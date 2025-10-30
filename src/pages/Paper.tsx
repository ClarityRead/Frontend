import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiClient } from "../lib/apiclient";
import ReactMarkdown from "react-markdown";
import PdfViewer from "../components/PdfViewer";

function Paper() {
    const { id } = useParams();
    const [paperData, setPaperData] = useState<Paper>();
    const [aiExplanation, setAiExplanation] = useState<string>("");
    const [aiSummary, setAiSummary] = useState<string>("");
    const [showDetails, setShowDetails] = useState(false);

    const GetPaper = useCallback(async () => {
        try {
            const result = await apiClient.get(`api/papers/${id}`);
            setPaperData(result.data);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            toast.error(err.response?.data?.error || "Error fetching paper");
        }
    }, [id]);

    useEffect(() => {
        GetPaper();
    }, [GetPaper]);

    const GetSummary = useCallback(async () => {
        try {
            const result = await apiClient.post(`api/papers/${id}`, {
                action: "summarize",
            });
            setAiSummary(result.data.data);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            toast.error(
                err.response?.data?.error || "Error fetching AI summary"
            );
        }
    }, [id]);

    const handleExplainSelection = async () => {
        const selectedText = window.getSelection()?.toString().trim();

        if (!selectedText) {
            toast.error("Please select some text first.");

            return;
        }

        try {
            const result = await apiClient.post(`api/papers/${id}`, {
                action: "explain_term",
                term: selectedText,
            });

            setAiExplanation(result.data.data);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            toast.error(
                err.response?.data?.error || "Error fetching explanation"
            );
        }
    };

    useEffect(() => {
        if (paperData) {
            GetSummary();
        }
    }, [paperData, id, GetSummary]);

    if (!paperData)
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
                    <p className="mt-4 text-xl font-semibold text-gray-700">
                        Loading paper...
                    </p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="bg-white shadow-lg border-b border-indigo-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {paperData.title}
                            </h1>
                            <div className="flex flex-wrap gap-3 items-center text-sm">
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                                    {paperData.author}
                                </span>
                                <span className="text-gray-600">
                                    {paperData.published}
                                </span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                                    {paperData.domain}
                                </span>
                                <button
                                    onClick={() => setShowDetails(!showDetails)}
                                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                >
                                    {showDetails
                                        ? "Hide Details ▲"
                                        : "Show Details ▼"}
                                </button>
                            </div>

                            {showDetails && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                                    <p>
                                        <span className="font-semibold text-gray-700">
                                            Subdomain:
                                        </span>{" "}
                                        <span className="text-gray-600">
                                            {paperData.subdomain}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">
                                            Reference:
                                        </span>{" "}
                                        <a
                                            href={paperData.reference_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline"
                                        >
                                            {paperData.reference_link}
                                        </a>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-gray-700">
                                            PDF:
                                        </span>{" "}
                                        <a
                                            href={paperData.pdf_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline"
                                        >
                                            {paperData.pdf_link}
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    Research Paper PDF
                                </h2>
                                <p className="text-indigo-100 text-sm mt-1">
                                    Select any text in the PDF below to get AI
                                    explanations
                                </p>
                            </div>
                            <div className="p-4">
                                <PdfViewer id={paperData.id}></PdfViewer>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 sticky top-28">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                    AI Assistant
                                </h2>
                            </div>

                            <div className="p-6 space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-indigo-200">
                                    <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Original Summary
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {paperData.summary}
                                    </p>
                                </div>

                                {aiSummary && (
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
                                        <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                />
                                            </svg>
                                            AI Summary
                                        </h3>
                                        <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
                                            <ReactMarkdown>
                                                {aiSummary}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleExplainSelection}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    Explain Selected Text
                                </button>
                                <p className="text-xs text-center text-gray-500">
                                    Select text from the PDF and click the
                                    button above
                                </p>

                                {aiExplanation && (
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 animate-fadeIn">
                                        <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            AI Explanation
                                        </h3>
                                        <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none">
                                            <ReactMarkdown>
                                                {aiExplanation}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paper;
