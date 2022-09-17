import React, {FC} from 'react';

import {Layout} from './Layout';

export const NotFoundPage: FC = () => {
  return (
    <Layout>
      <article className="Col FlexGrow1 FlexCenter">
        <span className="Text">Not Found 404</span>
      </article>
    </Layout>
  );
};
