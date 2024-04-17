import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const EReader: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className='ereader'>
            <Viewer fileUrl={pdfUrl} />
        </div>
    </Worker>
);

export default EReader;
