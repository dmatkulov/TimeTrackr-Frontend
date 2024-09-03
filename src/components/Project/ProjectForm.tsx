import { ProjectMutation } from '../../types/types.project';
import { Button, Form, Input, Modal, Select, TimePicker } from 'antd';
import { useEffect, useState } from 'react';
import { ProjectEnum } from '../../enum/project.enum';
import { useGetTeamsListQuery } from '../../store/services/team/team';
import { TeamMutation } from '../../types/types.team';
import {
  buddhistLocale,
  disabledTime,
  format,
} from '../../utils/formattedTime';
import { handleFormFieldError } from '../../utils/handleError';

const initialState: ProjectMutation = {
  teamID: '',
  name: '',
  description: '',
  deadline: '',
  type: ProjectEnum.NEW_PRODUCT_LAUNCH,
};

interface ProjectFormProps {
  onSubmit: (state: ProjectMutation) => void;
  existingProject?: ProjectMutation;
  existingTeamId?: string;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  isError: boolean;
  error: unknown;
  isEdit?: boolean;
}

const ProjectForm = ({
  onSubmit,
  existingProject,
  existingTeamId,
  error,
  isEdit,
  isError,
  loading,
  isOpen,
  onClose,
}: ProjectFormProps) => {
  const [form] = Form.useForm();
  const { data: teams = [] } = useGetTeamsListQuery();
  const [state, setState] = useState<ProjectMutation>(initialState);

  useEffect(() => {
    if (existingProject) {
      setState(existingProject);
      form.setFieldsValue(existingProject);
    }

    if (existingTeamId) {
      setState({ ...initialState, teamID: existingTeamId });
      form.setFieldsValue({ ...initialState, teamID: existingTeamId });
    }
  }, [existingProject, existingTeamId]);

  useEffect(() => {
    handleFormFieldError(isError, error, form);
  }, [isError, error, form]);

  const handleSubmit = async () => {
    onSubmit(state);
    isEdit && onClose();
    setState(initialState);
    form.setFieldsValue(initialState);
  };

  const handleClose = () => {
    form.resetFields();
    setState(initialState);
    onClose();
  };

  const teamOpt = teams.map((team) => ({
    label: team.name,
    value: team._id,
  }));

  return (
    <Modal
      open={isOpen}
      title={isEdit ? 'Редактировать' : 'Создать проект'}
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
        <Form.Item
          name="teamId"
          rules={[{ required: true, message: 'Укажите пользователя' }]}
        >
          <Select
            size="large"
            variant="filled"
            notFoundContent="Никого не удалось найти"
            style={{ width: '100%' }}
            value={state.teamID}
            placeholder="Введите имя"
            allowClear
            showSearch
            options={teamOpt}
          />
        </Form.Item>
        <Form.Item<TeamMutation>
          label="Название команды"
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<TeamMutation>
          label="Название команды"
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="teamId"
          rules={[{ required: true, message: 'Укажите пользователя' }]}
        >
          <Select
            mode="multiple"
            size="large"
            variant="filled"
            notFoundContent="Никого не удалось найти"
            style={{ width: '100%' }}
            value={state.teamID}
            placeholder="Введите имя"
            allowClear
            showSearch
            options={teamOpt}
          />
        </Form.Item>
        <Form.Item
          label="Дедлайн"
          name="deadline"
          rules={[{ required: true, message: 'Время не указано' }]}
        >
          <TimePicker
            disabledTime={disabledTime}
            hideDisabledOptions={true}
            variant="filled"
            placeholder="Начало"
            minuteStep={5}
            format={format}
            needConfirm={false}
            locale={buddhistLocale}
            width="100%"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          size="large"
        >
          {isEdit ? 'Сохранить' : 'Создать'}
        </Button>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
