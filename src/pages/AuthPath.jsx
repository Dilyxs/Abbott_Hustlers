import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenVerifier } from '../../utils/APIFunc';

const AuthPath = ({ children }) => {
  const Navigate = useNavigate();
  const [TokenData, setTokenData] = useState(null);
  const [TokenVerification, setTokenVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  if (isLoading) {
    return <p>Loading...</p>;
  }


  if (TokenData === null) {
    return (
      <div>
        <p>You are not Authenticated!</p>
        <button onClick={() => Navigate("/login")}>Authenticate Yourself</button>
      </div>
    );
  }

  if (!TokenVerification) {
    return (
      <div>
        <p>Your Token Has Expired!</p>
        <button onClick={() => Navigate("/login")}>Authenticate Yourself</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthPath;
