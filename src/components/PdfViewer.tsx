import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';

export default function PdfViewer({ url }) {
    url = "http://localhost:8000/api/papers/pdf/addsfsdf";
    console.log(url);
    const [pdfData, setPdfData] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const file_url = URL.createObjectURL(blob);
            console.log(file_url);
            setPdfData(file_url);
        });
    }, [url]);

    if (!pdfData) return <p>Loading PDF...</p>;

    return (
        <Document file={url}>
            <Page pageNumber={1} />
        </Document>
    );
}