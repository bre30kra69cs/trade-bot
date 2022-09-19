import React, {FC} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {fetcher} from './fetcher';

type AddProfileModalProps = {
  show?: boolean;
  onHide?: () => void;
};

type AddProfileForm = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export const AddProfileModal: FC<AddProfileModalProps> = ({show, onHide}) => {
  const form = useForm<AddProfileForm>({
    resolver: yupResolver(schema),
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form
        onSubmit={form.handleSubmit((data) => {
          fetcher.post('profile', {
            body: JSON.stringify(data),
          });

          onHide?.();
        })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Controller
              control={form.control}
              name="name"
              defaultValue=""
              render={({field: {onChange, onBlur, value, ref}}) => {
                return (
                  <Form.Control
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    isInvalid={!!form.formState.errors.name}
                    placeholder="Enter Name"
                  />
                );
              }}
            />
            <Form.Control.Feedback type="invalid">
              {form.formState.errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            CLOSE
          </Button>
          <Button variant="primary" type="submit">
            ADD
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
