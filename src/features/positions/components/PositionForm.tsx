import React from 'react';
import { Position, PositionMutation } from '../../../types/types.position';
import { Button, Col, Drawer, Form, FormProps, Input, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPositionsCreating } from '../positionsSlice';
import { createPosition } from '../positionsThunks';

interface Props {
  existingItem?: Position;
  isEdit?: boolean;
  open: boolean;
  onClose: () => void;
}
const PositionForm: React.FC<Props> = ({ open, onClose, isEdit }) => {
  const dispatch = useAppDispatch();
  const creating = useAppSelector(selectPositionsCreating);
  const [form] = Form.useForm();

  const closeDrawer = () => {
    onClose();
    form.resetFields();
  };

  const onSubmit: FormProps<PositionMutation>['onFinish'] = async (
    mutation,
  ) => {
    await dispatch(createPosition(mutation)).unwrap();
    closeDrawer();
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title="Создание позиции"
        width={320}
        onClose={closeDrawer}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Row>
            <Col span={24} style={{ marginBottom: '8px' }}>
              <Form.Item<PositionMutation>
                name="name"
                label="Название позиции"
                rules={[
                  {
                    required: true,
                    message: 'Поле не может быть пустым',
                  },
                ]}
              >
                <Input name="name" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={creating}
              >
                {isEdit ? 'Редактировать' : 'Создать'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default PositionForm;
