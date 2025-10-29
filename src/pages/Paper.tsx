import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { apiClient } from '../lib/apiclient'
import ReactMarkdown from 'react-markdown';
import PdfViewer from '../components/PdfViewer';

function Paper() {
    const { id } = useParams();
    const [paperData, setPaperData] = useState<string>();
    const [aiExplanation, setAiExplanation] = useState<string>("");
    const [aiSummary, setAiSummary] = useState<string>("");

    const GetPaper = async () => {
        try {
            const result = await apiClient.get(`api/papers/${id}`);
            setPaperData(result.data);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Error fetching paper");
        }
    };

    useEffect(() => {
        GetPaper();
    }, []);

    const GetSummary = async() => {
        toast.success("Requesting the server for the AI summary of the entire paper from the PDF link...");

        try {
            const result = await apiClient.post(`api/papers/${id}`, {
                action: "summarize",
            });

            console.log(result.data.data);
    
            setAiSummary(result.data.data); 
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Error fetching AI summary");
        }
    }

    const handleExplainSelection = async () => {
        const selectedText = window.getSelection()?.toString().trim();

        if (!selectedText) {
            toast.error("Please select some text first.");

            return;
        }

        toast.success("Sending a request to the server...");
    
        try {
            const result = await apiClient.post(`api/papers/${id}`, {
                action: "explain_term",
                term: selectedText
            });
    
            setAiExplanation(result.data.data); 
            toast.success(`Explanation received for: "${selectedText}"`);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Error fetching explanation");
        }
    };   

    useEffect(() => {
        if (paperData) {
            GetSummary();
        }
    }, [paperData, id]); 

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-4xl text-center font-bold text-gray-900">
                        {paperData ? paperData.title : "None"}
                    </h1>
                    <h2 className="text-2xl text-center font-bold text-gray-800">
                        {paperData ? "Author: " + paperData.author : "None"}
                    </h2>
                    <h3 className="text-xl text-center font-bold text-gray-700">
                        {paperData ? "Date: " + paperData.published : "None"}
                    </h3>
                    <h3 className="text-lg text-center font-bold text-gray-600">
                        {paperData ? "Domain: " + paperData.domain + ", Subdomain: " + paperData.subdomain : "None"}
                    </h3>
                    <h3 className="text-base text-center font-bold text-gray-500">
                        {paperData ? (
                        <>
                        Reference link:{" "}
                        <a
                            href={paperData.reference_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {paperData.reference_link}
                        </a>
                        </>
                        ) : (
                            "None"
                        )}
                    </h3>
                    <h3 className="text-base text-center font-bold text-gray-500">
                        {paperData ? (
                        <>
                        PDF link:{" "}
                        <a
                            href={paperData.pdf_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {paperData.pdf_link}
                        </a>
                        </>
                        ) : (
                            "None"
                        )}
                    </h3>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl text-center font-bold text-gray-900">Summary provided by the Reference Link:</h1>
                    <p className="text-xl text-center font-bold text-gray-600 select-text">
                        {paperData ? paperData.summary : "None"}
                    </p>
                </div>
            </div>

            <PdfViewer url={`${paperData ? paperData.pdf_link : ""}`}></PdfViewer>

            {/* AI Summary */}
            {aiSummary && (
                <div className="bg-white mt-6">
                    <div className="container mx-auto px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-700">AI Summary of the Entire Paper from the PDF Link:</h2>
                        <div className="mt-2 text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
                            <ReactMarkdown>{aiSummary}</ReactMarkdown>
                        </div>
                    </div>
                    {/* Button */}
                    <div className="bg-white">
                        <div className="container mx-auto px-6 py-4 flex justify-center">
                            <button
                                onClick={handleExplainSelection}
                                className="px-6 py-3 rounded-lg bg-blue-500 text-2xl font-bold text-white"
                            >
                                Select any terms in the text above, and click here to have AI explain them!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Explanation */}
            {aiExplanation && (
                <div className="bg-white mt-6">
                    <div className="container mx-auto px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-700">AI Explanation of the Selected Text:</h2>
                        <div className="mt-2 text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
                            <ReactMarkdown>{aiExplanation}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paper 