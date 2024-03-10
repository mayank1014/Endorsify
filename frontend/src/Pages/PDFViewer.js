import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaFilePdf } from 'react-icons/fa';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ filename }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPDFData] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetch/${filename}`, {
          responseType: 'arraybuffer',
        });
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPDFData(pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPDF();

    return () => {
      URL.revokeObjectURL(pdfData);
    };
  }, [filename]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const documentStyle = {
    width: '100%',
  };

  const pageStyle = {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
  };

  const loadingMessageStyle = {
    textAlign: 'center',
    margin: '20px',
  };

  const handleOpenPdf = () => {
    window.open(pdfData, '_blank');
  };

  return (
    <div>
      {pdfData ? (
        <div style={containerStyle}>
          <div style={{ cursor: 'pointer' }} onClick={handleOpenPdf}>
            <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess} className="pdf-document">
              <Page pageNumber={1} style={pageStyle} />
            </Document>
          </div>
        </div>
      ) : (
        <p style={loadingMessageStyle}>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
