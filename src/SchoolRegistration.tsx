import React, { useState } from 'react';
import Axios from 'axios';
import './SchoolRegistration.scss';

const SchoolRegistration = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isRegistering, setIsRegistering] = useState(true);

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        `http://127.0.0.1:3000/api/v1/schools/${isRegistering ? 'register' : 'login'}`,
        {
          name,
          location
        }
      );

      console.log(
        `School ${isRegistering ? 'registered' : 'logged in'} successfully:`,
        response.data
      );
    } catch (error) {
      console.error(`Error ${isRegistering ? 'registering' : 'logging in'} school:`, error);
    }
  };

  return (
    <div className="background">
      <div className="school-registration-container">
        <h2>{isRegistering ? 'Register School' : 'Enter Registered School'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">
            {isRegistering ? 'Register School' : 'Enter School'}
          </button>
        </form>
        <button onClick={handleToggleMode}>
          {isRegistering ? '' : 'Switch to Register School'}
        </button>
        <p>
          {isRegistering
            ? "Already have a school? "
            : "Need to register a school? "}
          <button onClick={handleToggleMode}>
            {isRegistering ? 'Enter Here' : 'Register Here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SchoolRegistration;
