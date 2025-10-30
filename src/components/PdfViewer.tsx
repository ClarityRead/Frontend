import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { apiClient } from "../lib/apiclient";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PdfViewer({ id }: { id: string }) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);

    useEffect(() => {
        let objectUrl: string | null = null;

        const fetchPdf = async () => {
            try {
                const res = await apiClient.get(`/api/papers/pdf/${id}`, {
                    responseType: "blob",
                });

                const blob = new Blob([res.data], { type: "application/pdf" });
                objectUrl = URL.createObjectURL(blob);
                setPdfUrl(objectUrl);
            } catch (err) {
                console.error("Error fetching PDF:", err);
                setError(
                    err instanceof Error ? err.message : "Failed to fetch PDF"
                );
            }
        };

        fetchPdf();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [id]);

    if (error) return <p>Error loading PDF: {error}</p>;
    if (!pdfUrl) return <p>Loading PDF...</p>;

    return (
        <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => {
                console.error("PDF load error:", error);
                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load PDF"
                );
            }}
        >
            {Array.from(new Array(numPages), (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
        </Document>
    );
}
