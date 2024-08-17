import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TeamMemberMutation, TeamMutation } from '../../types/types.team';
import { useGetAllUserQuery } from '../../store/services/user/user';
import { useGetPositionsQuery } from '../../store/services/positions/positions';
import AvatarPic from '../UI/UserAvatar/Avatar';

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

const TeamForm: React.FC = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState<TeamMutation>(initialState);
  const { data: users } = useGetAllUserQuery();
  const { data: positions } = useGetPositionsQuery();

  const handleSubmit = async () => {
    console.log(state);
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

  if (users && users.length > 0) {
    console.log(users);
  }

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
              value={state.name}
              onChange={handleChange}
              name="name"
              size="large"
            />
          </Form.Item>
          <Form.Item<TeamMutation> label="Описание команды" name="description">
            <Input.TextArea
              value={state.description}
              onChange={handleChange}
              name="description"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <p>Добавьте участников</p>
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
                      flexDirection:
                        state.members.length > 1 ? 'row-reverse' : 'row',
                    }}
                  >
                    {state.members.length - 1 === index && (
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={addMember}
                          icon={<PlusOutlined />}
                        />
                      </Form.Item>
                    )}
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
                  </Space>
                </Col>
              </Row>
            ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TeamForm;
