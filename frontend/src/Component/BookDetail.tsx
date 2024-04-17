import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Share from './Share';
import EReader from './E-Reader';

interface Book {
    title: string;
    subtitle: string;
    authors: string;
    image: string;
    description: string;
    download: string;
    pages: string;
    publisher: string;
    year: string;
}

const BookDetail: React.FC = () => {
    const [activeTab, setActiveTab] = useState('description');
    const [book, setBook] = useState<Book | null>(null);
    const { id } = useParams<{ id: string }>();
    const [read, setRead] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const formattedId = id?.endsWith('X') ? id.slice(0, -1) : id;
                const response = await axios.get(`https://www.dbooks.org/api/book/${formattedId}`);
                setBook(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleDownload = () => {
        if (book && book.download) {
            window.location.href = book.download;
            alert("Thank you for downloading")
        }
    };

    const handleRead = () => {
        setRead(!read)
        const url = book ? book.download : '';
        if (read) {
            localStorage.setItem('pdfurl', url)
            navigate('/reader')
        }
    }

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="card-title">{book.title}</h2>
            <h6 className="card-subtitle mb-2 text-muted">{book.subtitle}</h6>
            <p><strong>By : </strong>{book.authors}</p>
            <div className="row">
                <div className="col-md-4">
                    <img src={book.image} alt={book.title} className="img-fluid image" />
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <button type='button' className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} onClick={() => handleTabChange('description')}>Description</button>
                                </li>
                                <li className="nav-item">
                                    <button type='button' className={`nav-link ${activeTab === 'contents' ? 'active' : ''}`} onClick={() => handleTabChange('contents')}>Details</button>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {activeTab === 'description' ? (
                                <div>
                                    <p className="card-text">{book.description}</p>
                                </div>
                            ) : (
                                <div>
                                    <table className="table table-sm">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Title:</th>
                                                <td>{book.title ? ` ${book.title}` : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Author (s):</th>
                                                <td>{book.authors ? ` ${book.authors}` : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Subtitle:</th>
                                                <td>{book.subtitle ? ` ${book.subtitle}` : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Publisher:</th>
                                                <td>{book.publisher ? ` ${book.publisher}` : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Pages:</th>
                                                <td>{book.pages ? ` ${book.pages} Pages` : "N/A"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Year:</th>
                                                <td>{book.year ? ` ${book.year}` : "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='center'>
                        <button type='button' className="btn mt-4" onClick={handleDownload}>
                            Download
                        </button>
                        <button type='button' className="btn read mt-4" onClick={handleRead}>
                            {!read ? 'Read' : 'Fullscreen'}
                        </button>
                    </div>
                    {read && <EReader pdfUrl={book.download} />}
                </div>
            </div>
            <div className='mt-5 center '><Share /></div>
        </div>
    );
};

export default BookDetail;
