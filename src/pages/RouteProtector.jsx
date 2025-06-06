import React, { useEffect, useState } from 'react';
import { Iscookied } from '../../utils/APIFunc';
import { useNavigate,useLocation } from 'react-router-dom';


const RouteProtector = ({ children, setLocation }) => {
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      try {
        const [auth, id] = await Iscookied();
        if (!auth) {
        console.log(location.pathname);

        setTimeout(()=>{
        setLocation(location.pathname);
        navigate('/login'); 
        },0)
        } else {
          setIsAllowed(true);
          setUserId(id);
        }
      } catch (error) {
        console.log(location.pathname);
        setTimeout(()=>{
            setLocation(location.pathname);
            navigate('/login'); 
            },0)
      }
    };

    verify();
  }, [navigate]);

  if (!isAllowed || !children) return null;
  return React.cloneElement(children, { id: userId});
};

export default RouteProtector;
