import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface Book {
    id: string;
    title: string;
    subtitle: string;
    authors: string;
    image: string;
    url: string;
}

const HomePage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)
            try {
                const response = await axios.get('https://www.dbooks.org/api/recent');
                setBooks(response.data.books);
                // console.log(response.data)
            } catch (error) {
                // console.error('Error fetching books:', error);
                setBooks([]);
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mt-4">
            {loading ?
                <center>
                    <h1 className='f-title'>Welcome to Bookify!</h1>
                </center>
                :
                <h1 className='f-title'>Welcome to Bookify!</h1>}
            {loading ? <Loader /> :
                <div className="card-container">
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
            }
        </div>
    );
};

export default HomePage;