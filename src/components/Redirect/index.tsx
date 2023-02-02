import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface RedirectProps {
  to: string;
}

const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace: true });
  });

  return null;
};

export default Redirect;
