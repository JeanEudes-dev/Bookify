import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://www.dbooks.org/api/recent');
                setBooks(response.data.books);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="container mt-4">
            <h1>Welcome to Bookify! <br/> FREE DOWNLOAD OPEN BOOKS</h1>
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
        </div>
    );
};

export default HomePage;