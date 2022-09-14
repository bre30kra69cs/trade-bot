import React, {FC, ReactNode} from 'react';

import './Layout.css';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({children}) => {
  return <article className="Col FlexCenter Layout">{children}</article>;
};
