import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

export const Header: FC = () => {
  return (
    <header className="Row FlexAlignCenter Header">
      <Link to="/">
        <span className="Caption ColorPrimary2">Main</span>
      </Link>
    </header>
  );
};
