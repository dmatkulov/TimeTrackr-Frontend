import React, { useEffect } from 'react';
import { PositionMutation } from '../../../types/types.position';
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Tag,
} from 'antd';
import { useAppSelector } from '../../../app/hooks';
import {
  selectOnePositionLoading,
  selectPositionsCreating,
} from '../positionsSlice';
import Spinner from '../../../components/UI/Spin/Spin';
import { tagOptions } from '../../../utils/tagOptions';

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
  existingItem,
}) => {
  const creating = useAppSelector(selectPositionsCreating);
  const loading = useAppSelector(selectOnePositionLoading);
  const [form] = Form.useForm();

  useEffect(() => {
    if (existingItem) {
      form.setFieldsValue(existingItem);
    }
  }, [existingItem, form]);

  const closeDrawer = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit: FormProps<PositionMutation>['onFinish'] = async (
    values,
  ) => {
    try {
      onSubmit(values);
      closeDrawer();
      form.resetFields();
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Drawer
      title={isEdit ? 'Редактирование' : 'Создание позиции'}
      width={360}
      onClose={closeDrawer}
      open={open}
      forceRender
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          initialValues={existingItem}
        >
          <Row>
            <Col span={24}>
              <Form.Item<PositionMutation>
                name="name"
                label="Название позиции"
                rules={[
                  { required: true, message: 'Поле не может быть пустым' },
                  {
                    validator: (_, value) =>
                      value && value.trim() !== ''
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('Поле не может содержать только пробелы'),
                          ),
                  },
                ]}
              >
                <Input name="name" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item<PositionMutation> name="tag" label="Цвет тэга">
                <Select
                  options={tagOptions}
                  optionRender={(oriOption) => {
                    return (
                      <p>
                        <Tag color={oriOption.value?.toString()}>
                          {oriOption.value}
                        </Tag>
                      </p>
                    );
                  }}
                />
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
      )}
    </Drawer>
  );
};

export default PositionForm;
