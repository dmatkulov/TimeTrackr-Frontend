import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { TeamMutation } from '../../../types/types.team';
import { useGetAllUserQuery } from '../../../store/services/user/user';
import UserAvatar from '../../UI/UserAvatar/UserAvatar';
import './index.css';
import { handleFormFieldError } from '../../../utils/handleError';
import { useMediaQuery } from 'react-responsive';

const initialState: TeamMutation = {
  name: '',
  description: '',
  members: [],
};

interface Props {
  onSubmit: (state: TeamMutation) => void;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  isError: boolean;
  error: unknown;
}

const TeamForm: React.FC<Props> = ({
  onSubmit,
  loading,
  isOpen,
  onClose,
  isError,
  error,
}) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<TeamMutation>(initialState);
  const { data: users } = useGetAllUserQuery();

  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 480px)',
  });

  const handleSubmit = async () => {
    console.log(state);
    onSubmit(state);
    // setState(initialState);
    // form.setFieldsValue(initialState);
  };

  useEffect(() => {
    handleFormFieldError(isError, error, form);
  }, [isError, error, form]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    form.resetFields();
    setState(initialState);
    onClose();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const userOptions = users?.map((user) => ({
    value: user._id,
    label: `${user.firstname} ${user.lastname}`,
    photo: user.photo,
  }));

  const handleMemberChange = (value: string[]) => {
    setState((prevState) => ({
      ...prevState,
      members: value,
    }));
  };

  return (
    <Modal
      open={isOpen}
      title="Создать команду"
      onCancel={handleClose}
      width={700}
      footer={[]}
      styles={{
        body: {
          margin: '20px 0 10px 0',
          padding: '10px 0',
        },
      }}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Row gutter={24} justify="space-between">
          <Col xs={24}>
            <Form.Item<TeamMutation>
              label="Название команды"
              name="name"
              rules={[{ required: true, message: 'Введите название' }]}
            >
              <Input
                variant="filled"
                value={state.name}
                onChange={handleChange}
                name="name"
                size="large"
              />
            </Form.Item>
            <Form.Item<TeamMutation>
              label="Описание команды"
              name="description"
            >
              <Input.TextArea
                variant="filled"
                value={state.description}
                onChange={handleChange}
                name="description"
                placeholder="Дайте описание команды"
                autoSize={{ minRows: 5, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ marginBottom: '24px' }}>
            <p className="members-label">Добавьте участников</p>

            <Row gutter={24}>
              <Col xs={24}>
                <Form.Item
                  name={['members']}
                  rules={[{ required: true, message: 'Укажите пользователя' }]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    variant="filled"
                    notFoundContent="Никого не удалось найти"
                    style={{ width: '100%' }}
                    value={state.members}
                    filterOption={filterOption}
                    placeholder="Введите имя"
                    allowClear
                    showSearch
                    options={userOptions}
                    optionRender={(option) => (
                      <Space>
                        <UserAvatar
                          image={option.data.photo}
                          firstname={option.data.label.split(' ')[0]}
                          lastname={option.data.label.split(' ')[1]}
                        />
                        {option.data.label}
                      </Space>
                    )}
                    onChange={handleMemberChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider style={{ marginBottom: '44px' }} />
        <Flex justify="space-between" vertical={xxs} gap={24}>
          <Space
            style={{ justifyContent: xxs ? 'space-between' : 'flex-start' }}
          >
            <Button
              icon={<ClearOutlined />}
              onClick={() => form.resetFields()}
              size="large"
            >
              Очистить поля
            </Button>
            <Button onClick={handleClose} size="large">
              Отменить
            </Button>
          </Space>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            size="large"
          >
            Создать
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default TeamForm;
