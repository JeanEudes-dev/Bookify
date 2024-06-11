import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import toast, { Toaster } from 'react-hot-toast';
import AudioPlayer from './AudioPlayer';

interface Book {
    title: string;
    authors: string;
    download: string;
}

const BookifyAI: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const pdfUrl = localStorage.getItem('pdfurl');

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const formattedId = id?.endsWith('X') ? id.slice(0, -1) : id;
                const response = await axios.get(`https://www.dbooks.org/api/book/${formattedId}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleSummarize = async () => {
        if (book && book.download) {
            setLoading(true);
            const formData = new FormData();
            const response = await fetch(book.download);
            const blob = await response.blob();
            formData.append('file', blob);
            try {
                const response = await axios.post<{ summary: string }>('http://localhost:8000/api/summarize/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setSummary(response.data.summary);
            } catch (error) {
                console.error('Error summarizing book:', error);
            }
            setLoading(false);
        }
    };

    const handleReadAloud = async () => {
        if (summary) {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:8000/api/text-to-speech/', { text: summary }, {
                    responseType: 'blob', // Important to set responseType to blob
                    headers: { 'Content-Type': 'application/json' },
                });
                const audioUrl = URL.createObjectURL(response.data);
                setAudioUrl(audioUrl);
            } catch (error: any) {
                toast(
                    "Oups an error ocurred try again later.",
                    {
                        duration: 3000,
                    }
                )
                console.error('Error generating audio:', error);


            } finally {
                setLoading(false);
            }
        } else if (book && book.download) {
            toast(
                "Sorry Dear user, Bookify Ai is at an early stage and can't read aloud a full book. \n\nHowever we can summarise and read aloud the summarised version of your book !",
                {
                    duration: 6000,
                }
            );
        }
    };

    if (loading || !book) {
        return <Loader />;
    }

    return (
        <>
            <div><Toaster /></div>
            <div className="container mt-5">
                <h2 className='title'>Bookify AI</h2>
                <p><strong>{book.title}</strong> by {book.authors}</p>
                <div className="mt-4">
                    <button type="button" className="btn" onClick={handleSummarize}>
                        Summarize
                    </button>
                    <button type="button" className="btn" onClick={handleReadAloud}>
                        Read Aloud
                    </button>
                </div>
                {loading && <Loader />}{audioUrl && <div className="mt-4">
                    <AudioPlayer src={audioUrl} />

                </div>}
                {summary && <div className="mt-4"><h4>Summary</h4><p>{summary}</p></div>}


                {!summary && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <div className='middle-screen-viewer'>
                        <Viewer fileUrl={`${pdfUrl}`} />
                    </div>
                </Worker>}
            </div>
        </>
    );
};

export default BookifyAI;