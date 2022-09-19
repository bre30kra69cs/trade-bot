import React, {FC, ReactNode} from 'react';
import Nav from 'react-bootstrap/Nav';

import {Alerts} from './Alerts';
import {cn} from './cn.util';

interface LayoutProps {
  className?: string;
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({className, children}) => {
  return (
    <>
      <header className="container bg-primary">
        <Nav>
          <Nav.Item>
            <Nav.Link className="text-light" href="/">
              Main
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
      <main className={cn('d-flex flex-column flex-fill bg-light', className)}>
        {children}
      </main>
      <Alerts />
    </>
  );
};
