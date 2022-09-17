import React, {FC} from 'react';

import {Layout} from './Layout';
import {Button} from './Button';

import './MainPage.css';

export const MainPage: FC = () => {
  return (
    <Layout>
      <article className="MainPage">
        <section className="MainPageProfiles">
          <section className="MainPageSection">
            <header className="Row FlexJustifyBetween FlexAlignCenter">
              <span className="Title">Profiles</span>
              <Button>ADD</Button>
            </header>
          </section>
        </section>
        <section className="MainPageSome"></section>
      </article>
    </Layout>
  );
};
