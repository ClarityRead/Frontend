import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { apiClient } from '../lib/apiclient'

function Paper() {
    const {id} = useParams();
    const [paperData, setPaperData] = useState();

    const GetPaper = async () => {
        try {
            const result = await apiClient.get(`api/papers/${id}`);
            setPaperData(result.data);
        } catch (error : any) {
            toast.error(error.response.data.error);    
        }
    }
    useEffect(() => {
        GetPaper();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900"></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paper 