import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ deck }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Assuming the deck name is always the last part of the breadcrumb
  const isDeckName = pathnames.length === 2 && pathnames[0] === "decks";

  return (
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb" style={{ backgroundColor: '#1a1a1a', borderRadius: '0.25rem' }}>
      <li className="breadcrumb-item">
        <Link to="/" className="text-light">Home</Link>
      </li>
      {isDeckName ? (
        <li className="breadcrumb-item active" aria-current="page" style={{ color: '#0abdc6' }}>
          {deck ? deck.name : 'Loading...'}
        </li>
      ) : (
        pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <li key={name} className="breadcrumb-item active" aria-current="page" style={{ color: '#0abdc6' }}>
              {name}
            </li>
          ) : (
            <li key={name} className="breadcrumb-item">
              <Link to={routeTo} className="text-light">{name}</Link>
            </li>
          );
        })
      )}
    </ol>
</nav>

  );
};

export default Breadcrumb;
