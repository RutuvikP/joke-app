import React, { useState } from 'react';
import './Quote.css';
import axios from 'axios';

const QuoteGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://quote-server-u09z.onrender.com/quote?keyword=${keyword}`);
      console.log(response);
      setQuote(response.data);
    } catch (error) {
      setError('Failed to generate quote. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="quote-generator">
      <form onSubmit={handleSubmit} className="quote-generator__form">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword"
          className="quote-generator__input"
        />
        <button type="submit" disabled={isLoading} className="quote-generator__button">
          {isLoading ? 'Generating...' : 'Generate Quote'}
        </button>
      </form>

      {quote && <p className="quote-generator__quote">Generated Quote: {quote}</p>}
      {error && <p className="quote-generator__error">{error}</p>}
    </div>
  );
};

export default QuoteGenerator;