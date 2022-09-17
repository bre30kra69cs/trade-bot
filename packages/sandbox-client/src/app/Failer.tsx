import React, {FC, ReactNode} from 'react';

import './Failer.css';

type FailerProps = {
  children?: ReactNode;
};

export const Failer: FC<FailerProps> = ({children}) => {
  return (
    <article className="Failer">
      <span className="Caption ColorCritical1">{'Some Error' ?? children}</span>
    </article>
  );
};
