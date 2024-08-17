import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TeamMemberMutation, TeamMutation } from '../../types/types.team';

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

  const handleMemberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => {
      const members = [...prevState.members];
      members[index][name as keyof TeamMemberMutation] = value;
      return {
        ...prevState,
        members,
      };
    });
  };

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
            <Input value={state.name} onChange={handleChange} name="name" />
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
          {state.members.map((member, index) => (
            <Space key={index} align="center">
              <Form.Item name={['members', index, 'user']}>
                <Input
                  name="user"
                  value={member.user}
                  onChange={(event) => handleMemberChange(event, index)}
                />
              </Form.Item>
              <Form.Item name={['members', index, 'position']}>
                <Input
                  name="position"
                  value={member.position}
                  onChange={(event) => handleMemberChange(event, index)}
                />
              </Form.Item>
              <Form.Item>
                {state.members.length > 1 && (
                  <MinusCircleOutlined onClick={() => removeMember(index)} />
                )}
              </Form.Item>
              <Form.Item>
                {state.members.length - 1 === index && (
                  <PlusOutlined onClick={addMember} />
                )}
              </Form.Item>
            </Space>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TeamForm;
