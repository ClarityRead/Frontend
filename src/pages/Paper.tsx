import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { apiClient } from '../lib/apiclient'

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

    GetSummary();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-2xl text-center font-bold text-gray-900">
                        {paperData ? paperData.title : "None"}
                    </h1>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white">
                <div className="container mx-auto px-6 py-4">
                    <p className="text-2xl text-center font-bold text-gray-500 select-text">
                        {paperData ? paperData.summary : "None"}
                    </p>
                </div>
            </div>

            {/* Button */}
            <div className="bg-white">
                <div className="container mx-auto px-6 py-4 flex justify-center">
                    <button
                        onClick={handleExplainSelection}
                        className="px-6 py-3 rounded-lg bg-blue-500 text-2xl font-bold text-white"
                    >
                        Ask AI to explain selected text
                    </button>
                </div>
            </div>

            {/* AI Summary */}
            {aiSummary && (
                <div className="bg-white mt-6">
                    <div className="container mx-auto px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-700">AI Explanation:</h2>
                        <p className="mt-2 text-gray-600">{aiSummary}</p>
                    </div>
                </div>
            )}

            {/* AI Explanation */}
            {aiExplanation && (
                <div className="bg-white mt-6">
                    <div className="container mx-auto px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-700">AI Explanation:</h2>
                        <p className="mt-2 text-gray-600">{aiExplanation}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Paper 