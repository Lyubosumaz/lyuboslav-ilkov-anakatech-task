
import React, { useEffect } from 'react';
import currencies from '../currencies.json';

export const App = () => {

  useEffect(() => {
    console.log(currencies);
  });

  return (
    <main>
      <header>Here</header>
    </main>
  );
}
