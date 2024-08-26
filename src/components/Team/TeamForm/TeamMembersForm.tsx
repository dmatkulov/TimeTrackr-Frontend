import { useState } from 'react';
import { Button, Flex, Form, Modal, Select, Space } from 'antd';
import UserAvatar from '../../UI/UserAvatar/UserAvatar';
import { useGetAllUserQuery } from '../../../store/services/user/user';
import { User, UserSummary } from '../../../types/types.user';
import { useMediaQuery } from 'react-responsive';

interface TeamMembersFormProps {
  open: boolean;
  onClose: () => void;
  existingUsers: UserSummary[];
  onSubmit: (state: string[]) => void;
  loading: boolean;
}

const TeamMembersForm = ({
  open,
  onClose,
  existingUsers,
  onSubmit,
  loading,
}: TeamMembersFormProps) => {
  const [form] = Form.useForm();

  const { data: users } = useGetAllUserQuery();

  const [state, setState] = useState<string[]>([]);

  let existing: User[] | undefined = [];

  if (users) {
    existing = users.filter(
      (user) => !existingUsers.some((u) => u._id === user._id),
    );
  }

  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 480px)',
  });

  const handleSubmit = async () => {
    onSubmit(state);
    setState([]);
    form.setFieldsValue([]);
    onClose();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const userOptions = existing?.map((user) => ({
    value: user._id,
    label: `${user.firstname} ${user.lastname}`,
    photo: user.photo,
    position: user.position.name,
  }));

  const handleMemberChange = (value: string[]) => {
    setState(value);
  };

  const handleClose = () => {
    form.resetFields();
    setState([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Добавить участников"
      onCancel={handleClose}
      width={700}
      footer={[]}
      styles={{
        body: {
          margin: '20px 0 10px 0',
          padding: '10px 0',
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Select
          mode="multiple"
          size="large"
          variant="filled"
          notFoundContent="Никого не удалось найти"
          style={{ width: '100%' }}
          value={state}
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
              {option.data.label}{' '}
              <span style={{ color: '#969a9e' }}>{option.data.position}</span>
            </Space>
          )}
          onChange={handleMemberChange}
        />
        <Flex
          justify="space-between"
          vertical={xxs}
          gap={24}
          style={{ marginTop: '30px' }}
        >
          <Button onClick={handleClose} size="large">
            Отменить
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            size="large"
          >
            Добавить
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default TeamMembersForm;
