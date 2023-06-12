import React from 'react';
import EventPosterCard from '../components/EventPosterCard';

// Default implementation, that you can customize

type RootProps = {
  children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => (
  <>
    {children}
    <EventPosterCard />
  </>
);

export default Root;
