import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


interface Book {
    id: string;
    title: string;
    subtitle: string;
    authors: string;
    image: string;
    url: string;
}


const TopicPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const { subject } = useParams<{ subject: string }>();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBooksBySubject = async () => {
            try {
                const response = await axios.get(`https://www.dbooks.org/api/search/${subject}`);
                setBooks(response.data.books);
            } catch (error) {
                console.error('Error fetching books by subject:', error);
            }
        };

        fetchBooksBySubject();
    }, [subject]);

    return (
        <div className="container mt-4">
            <h2>Books on {subject}</h2>
            <div className="card-container mt-4">
                {books.map((book) => (
                    <div className="book" onClick={() => navigate(`/book/${book.id}`)} key={book.id}>
                        <div className='book-details'>
                            <h3>{book.title}</h3><br />
                            <p><b>By </b>{book.authors}</p>
                        </div>

                        <div className="cover">
                            <img className='cover-image' src={book.image} alt={book.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicPage;
