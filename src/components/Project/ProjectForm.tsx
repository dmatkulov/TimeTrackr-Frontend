import { ProjectMutation } from '../../types/types.project';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { ProjectEnum } from '../../enum/project.enum';
import { useGetTeamsListQuery } from '../../store/services/team/team';
import { buddhistLocale } from '../../utils/formattedTime';
import { handleFormFieldError } from '../../utils/handleError';
import { ClearOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

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

  const xxs = useMediaQuery({
    query: '(min-width: 320px) and (max-width: 480px)',
  });

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
    setState(initialState);
    form.setFieldsValue(initialState);
    onClose();
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Команда"
              name="teamID"
              rules={[{ required: true, message: 'Укажите пользователя' }]}
            >
              <Select
                size="large"
                variant="filled"
                style={{ width: '100%' }}
                value={state.teamID}
                placeholder="Введите имя"
                allowClear
                showSearch
                options={teamOpt}
                onChange={(value: string) => {
                  setState({ ...state, teamID: value });
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Тип проекта"
              name="type"
              rules={[{ required: true, message: 'Укажите пользователя' }]}
            >
              <Select
                size="large"
                variant="filled"
                style={{ width: '100%' }}
                value={state.teamID}
                placeholder="Введите имя"
                allowClear
                showSearch
                options={Object.values(ProjectEnum).map((type) => ({
                  value: type,
                  label: type,
                }))}
                onChange={(value: string) => {
                  setState({ ...state, type: value });
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Дедлайн"
              name="deadline"
              rules={[{ required: true, message: 'Время не указано' }]}
            >
              <DatePicker
                size="large"
                allowClear={false}
                style={{ width: '100%' }}
                name="deadline"
                variant="filled"
                value={state.deadline}
                onChange={(_date, dateString) => {
                  if (typeof dateString === 'string') {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        deadline: dateString,
                      };
                    });
                  }
                }}
                locale={buddhistLocale}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Название проекта"
          name="name"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input
            variant="filled"
            size="large"
            name="name"
            value={state.name}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <Input.TextArea
            name="description"
            value={state.description}
            onChange={handleInputChange}
            variant="filled"
            autoSize={{ minRows: 5, maxRows: 5 }}
          />
        </Form.Item>

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
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
