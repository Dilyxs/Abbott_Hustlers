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
  return <p className="text-center text-lg text-gray-600">Loading...</p>;
}

if (!tokenData) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-red-50 rounded-xl shadow-md">
      <p className="text-red-700 text-lg font-semibold">You are not Authenticated!</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Authenticate Yourself
      </button>
    </div>
  );
}

if (!tokenVerified) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-yellow-50 rounded-xl shadow-md">
      <p className="text-yellow-700 text-lg font-semibold">Your Token Has Expired!</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
      >
        Authenticate Yourself
      </button>
    </div>
  );
}
  return <>{children}</>;
};

export default AuthPath;
