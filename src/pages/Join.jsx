import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

function Join() {
  const context = useContext(UserContext);

  const [name, setName] = useContext('');
  const [channel, setChannel] = useContext('');

  return (
    <div>Join</div>
  );
}

export default Join;
