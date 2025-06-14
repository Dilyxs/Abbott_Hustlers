import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenVerifier } from '../../utils/APIFunc';

const AuthPath = ({ children }) => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState(null);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authFlow = async () => {
      const stored = JSON.parse(localStorage.getItem('Token')) || null;
      setTokenData(stored);

      if (!stored) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await TokenVerifier(stored.userid, stored.verification);
        if (response === 200) {
          setTokenVerified(true);
        }
      } catch (err) {
        console.error("Verification failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    authFlow();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!tokenData) {
    return (
      <div>
        <p>You are not Authenticated!</p>
        <button onClick={() => navigate("/login")}>Authenticate Yourself</button>
      </div>
    );
  }

  if (!tokenVerified) {
    return (
      <div>
        <p>Your Token Has Expired!</p>
        <button onClick={() => navigate("/login")}>Authenticate Yourself</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthPath;
