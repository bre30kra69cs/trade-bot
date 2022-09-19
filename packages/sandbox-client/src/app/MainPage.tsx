import React, {useState, FC} from 'react';
import Button from 'react-bootstrap/Button';

import {Layout} from './Layout';
import {AddProfileModal} from './AddProfileModal';

export const MainPage: FC = () => {
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);

  return (
    <>
      <Layout className="align-items-center p-3">
        <section className="container">
          <section className="row">
            <section className="col">
              <section className="container bg-primary p-3 rounded">
                <section className="d-flex align-items-center justify-content-between">
                  <span className="text-light">Profiles</span>
                  <Button
                    variant="light"
                    onClick={() => {
                      setShowAddProfileModal(true);
                    }}
                  >
                    ADD
                  </Button>
                </section>
              </section>
            </section>
            <section className="col"></section>
          </section>
        </section>
      </Layout>
      <AddProfileModal
        show={showAddProfileModal}
        onHide={() => {
          setShowAddProfileModal(false);
        }}
      />
    </>
  );
};
