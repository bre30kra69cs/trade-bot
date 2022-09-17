import React, {FC, ReactNode} from 'react';

import {Header} from './Header';
import {Footer} from './Footer';

import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <article className="Col FlexGrow1 Layout">
      <Header />
      <main className="Col FlexGrow1">{children}</main>
      <Footer />
    </article>
  );
};
