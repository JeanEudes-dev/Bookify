import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Read: React.FC = () => {
    const pdfUrl = localStorage.getItem('pdfurl');
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div className='full-screen-viewer'>
                <Viewer fileUrl={`${pdfUrl}`} />
            </div>
        </Worker>
    )
};

export default Read;
