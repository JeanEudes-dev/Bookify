import React from 'react';

const HomePage: React.FC = () => {
    // Mock data for demonstration
    const books = [
        { id: 1, title: 'Book One', author: 'Author One', imageUrl: 'https://example.com/book1.jpg' },
        { id: 2, title: 'Book Two', author: 'Author Two', imageUrl: 'https://example.com/book2.jpg' },
        { id: 3, title: 'Book Three', author: 'Author Three', imageUrl: 'https://example.com/book3.jpg' },
    ];

    return (
        <div className="container mt-4">
            <h1>Welcome to Bookify!</h1>
            <div className="row mt-4">
                {books.map((book) => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={book.imageUrl} alt={book.title} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">By {book.author}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
