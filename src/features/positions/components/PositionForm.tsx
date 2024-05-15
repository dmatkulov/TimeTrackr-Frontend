import React from 'react';
import { PositionMutation } from '../../../types/types.position';
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Tooltip,
} from 'antd';
import { useAppSelector } from '../../../app/hooks';
import { selectPositionsCreating } from '../positionsSlice';
import { ClearOutlined } from '@ant-design/icons';

const initialState: PositionMutation = {
  name: '',
};
interface Props {
  onSubmit: (state: PositionMutation) => void;
  existingItem?: PositionMutation;
  isEdit?: boolean;
  open: boolean;
  onClose: () => void;
}
const PositionForm: React.FC<Props> = ({
  onSubmit,
  open,
  onClose,
  isEdit = false,
  existingItem = initialState,
}) => {
  const creating = useAppSelector(selectPositionsCreating);
  const [form] = Form.useForm();

  const closeDrawer = () => {
    onClose();
    form.resetFields();
  };

  const handleSubmit: FormProps<PositionMutation>['onFinish'] = async (
    mutation,
  ) => {
    onSubmit(mutation);
    closeDrawer();
    form.resetFields();
  };

  return (
    <>
      <Drawer
        title={isEdit ? 'Редактирование' : 'Создание позиции'}
        width={360}
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
          initialValues={existingItem}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row>
            <Col span={24}>
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
          </Row>
          <Row
            gutter={16}
            style={{
              display: 'flex',
              marginTop: 10,
              justifyContent: 'space-between',
            }}
          >
            <Col>
              <Tooltip placement="right" title="Очистить">
                <Button
                  icon={<ClearOutlined />}
                  danger
                  onClick={() => form.resetFields()}
                />
              </Tooltip>
            </Col>
            <Col xs={18}>
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
