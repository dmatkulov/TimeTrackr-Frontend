import React from 'react';
import { useParams } from 'react-router-dom';

const TeamInfo: React.FC = () => {
  const { id } = useParams() as { id: string };
  return <div>{id}</div>;
};

export default TeamInfo;
