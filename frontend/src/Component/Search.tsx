import React, { useState } from 'react';
import axios from 'axios';
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

const SearchBooks: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        try {
            setLoading(true)
            if (searchQuery) {
                const response = await axios.get(`https://www.dbooks.org/api/search/${searchQuery}`);
                setSearchResults(response.data.books);
                // console.log(response)
            } else {
                alert("Please enter a search Query")
            }
        } catch (error) {
            // console.error('Error searching books:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container mt-4">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control input"
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            {loading ? <Loader /> :
                <div>
                    {searchResults ? (
                        <div className="card-container">
                            {searchResults.map((book) => (
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
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>}
        </div>
    );
};

export default SearchBooks;