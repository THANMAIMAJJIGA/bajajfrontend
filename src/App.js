import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (jsonInput.trim() === '') {
        setError('Input cannot be empty');
        return;
      }

      const data = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:3000/bfhl', data);

      setResponseData(response.data);
      setError('');
      // Optionally clear the input after successful submission
      // setJsonInput('');
    } catch (err) {
      if (err.response) {
        setError(`Request failed with status code: ${err.response.status}`);
      } else if (err.request) {
        setError('No response received from the server. Please check your backend.');
      } else if (err instanceof SyntaxError) {
        setError('Invalid JSON input.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    return (
      <div>
        {selectedOptions.includes('Numbers') && numbers && numbers.length > 0 && (
          <p>Numbers: {numbers.join(', ')}</p>
        )}
        {selectedOptions.includes('Alphabets') && alphabets && alphabets.length > 0 && (
          <p>Alphabets: {alphabets.join(', ')}</p>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && highest_lowercase_alphabet && highest_lowercase_alphabet.length > 0 && (
          <p>Highest lowercase alphabet: {highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder="Enter JSON input"
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <br />
      <select multiple onChange={handleOptionChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
