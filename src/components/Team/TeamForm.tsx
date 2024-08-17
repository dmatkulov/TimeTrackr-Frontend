import React, { useState } from 'react';
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
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { TeamMemberMutation, TeamMutation } from '../../types/types.team';
import { useGetAllUserQuery } from '../../store/services/user/user';
import { useGetPositionsQuery } from '../../store/services/positions/positions';
import AvatarPic from '../UI/UserAvatar/Avatar';
import './index.css';

const initialState: TeamMutation = {
  name: '',
  description: '',
  members: [
    {
      user: '',
      position: '',
    },
  ],
};

interface Props {
  onSubmit: (state: TeamMutation) => void;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const TeamForm: React.FC<Props> = ({ onSubmit, loading, isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<TeamMutation>(initialState);
  const { data: users } = useGetAllUserQuery();
  const { data: positions } = useGetPositionsQuery();

  const handleSubmit = async () => {
    onSubmit(state);
    setState(initialState);
    form.setFieldsValue(initialState);
  };

  const addMember = () => {
    setState((prevState) => ({
      ...prevState,
      members: [
        ...prevState.members,
        {
          user: '',
          position: '',
        },
      ],
    }));
  };

  const removeMember = (index: number) => {
    setState((prevState) => {
      const members = [...prevState.members];
      members.splice(index, 1);
      return {
        ...prevState,
        members,
      };
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMemberChange = (name: string, index: number, value: string) => {
    setState((prevState) => {
      const members = [...prevState.members];
      members[index][name as keyof TeamMemberMutation] = value;
      return {
        ...prevState,
        members,
      };
    });
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
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} style={{ marginBottom: '24px' }}>
            <p className="members-label">Добавьте участников</p>
            {users &&
              positions &&
              state.members.map((member, index) => (
                <Row gutter={24} key={index}>
                  <Col xs={24} md={10}>
                    <Form.Item
                      name={['members', index, 'user']}
                      rules={[
                        { required: true, message: 'Укажите пользователя' },
                      ]}
                    >
                      <Select
                        variant="filled"
                        notFoundContent="Никого не удалось найти"
                        style={{ width: '100%' }}
                        value={member.user}
                        filterOption={filterOption}
                        placeholder="Введите имя"
                        allowClear
                        showSearch
                        options={userOptions}
                        optionRender={(option) => (
                          <Space>
                            <AvatarPic
                              image={option.data.photo}
                              firstname={option.data.label}
                            />
                            {option.data.label}
                          </Space>
                        )}
                        onChange={(value) =>
                          handleMemberChange('user', index, value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={10}>
                    <Form.Item
                      name={['members', index, 'position']}
                      rules={[{ required: true, message: 'Укажите позицию' }]}
                    >
                      <Select
                        variant="filled"
                        notFoundContent="Не удалось найти"
                        style={{ width: '100%' }}
                        value={member.position}
                        filterOption={filterOption}
                        placeholder="Выберите позицию"
                        allowClear
                        showSearch
                        onChange={(value) =>
                          handleMemberChange('position', index, value)
                        }
                        options={[
                          ...positions.map((position) => ({
                            value: position._id,
                            label: position.name,
                          })),
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={4}>
                    <Space
                      style={{
                        justifyContent: 'space-between',
                        display: 'flex',
                      }}
                    >
                      <Form.Item>
                        {state.members.length > 1 && (
                          <Button
                            danger
                            type="text"
                            icon={<MinusCircleOutlined />}
                            onClick={() => removeMember(index)}
                          />
                        )}
                      </Form.Item>
                      {state.members.length - 1 === index && (
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={addMember}
                            icon={<PlusOutlined />}
                          />
                        </Form.Item>
                      )}
                    </Space>
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>
        <Divider style={{ marginBottom: '44px' }} />
        <Flex justify="space-between">
          <Space>
            <Button icon={<ClearOutlined />} onClick={() => form.resetFields()}>
              Очистить поля
            </Button>
            <Button onClick={handleClose}>Отменить</Button>
          </Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Создать
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default TeamForm;
