import React, { useEffect, useState } from 'react';
import { TaskMutation } from '../../../types/types.task';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Row,
  Space,
  TimePicker,
  Typography,
} from 'antd';
import {
  buddhistLocale,
  convertTime,
  disabledTime,
  format,
} from '../../../utils/constants';
import TaskTag from '../components/TaskTag';
import { SwapOutlined } from '@ant-design/icons';
import { labelOptions } from '../../../utils/labelOptions';
import dayjs, { Dayjs } from 'dayjs';
import EditFormActions from './EditFormActions';
import { subtitleStyle } from '../styles/taskModalStyles';

interface Props {
  task: TaskMutation;
  onSubmit: (task: TaskMutation) => void;
  timeSpent: number;
  isEdit: boolean;
}

interface TaskEdit {
  title: boolean;
  description: boolean;
  time: boolean;
}

const initialState: TaskEdit = {
  title: false,
  description: false,
  time: false,
};
const EditTaskForm: React.FC<Props> = ({
  task,
  onSubmit,
  timeSpent,
  isEdit = false,
}) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<TaskMutation>(task);
  const [edit, setEdit] = useState<boolean>(isEdit);

  const [toggleForm, setToggleForm] = useState<TaskEdit>(initialState);

  useEffect(() => {
    setState(task);
    form.setFieldsValue({
      ...task,
      startTime: dayjs(task.startTime, 'HH:mm'),
      endTime: dayjs(task.endTime, 'HH:mm'),
    });
    setToggleForm(initialState);
  }, [task, form]);

  const handleSubmit = async () => {
    onSubmit(state);
  };

  const toggleField = (field: keyof TaskEdit) => {
    setToggleForm((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const cancelEditForm = (field: keyof TaskMutation | 'time') => {
    if (field === 'time') {
      setState((prevState) => ({
        ...prevState,
        startTime: task.startTime,
        endTime: task.endTime,
      }));
      form.setFieldsValue({
        startTime: dayjs(task.startTime, 'HH:mm'),
        endTime: dayjs(task.endTime, 'HH:mm'),
      });
    } else {
      setState((prevState) => ({
        ...prevState,
        [field]: task[field],
      }));
      form.setFieldsValue({
        [field]: task[field],
      });
    }
  };

  const handleLabelChange = (value: string) => {
    setState((prevState) => ({ ...prevState, label: value }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimeChange = (
    _date: Dayjs,
    dateString: string | string[],
    name: string,
  ) => {
    if (typeof dateString === 'string') {
      setState((prevState) => ({
        ...prevState,
        [name]: dateString,
      }));
    }
  };

  const items: MenuProps['items'] = labelOptions.map((label) => ({
    key: label.value,
    label: label.value,
    onClick: () => handleLabelChange(label.value),
  }));

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row>
        <Col xs={24}>
          {toggleForm.title || edit ? (
            <Row gutter={20}>
              <Col xs={20}>
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: 'Введите заголовок' }]}
                >
                  <Input
                    name="title"
                    value={state.title}
                    onChange={handleInputChange}
                    placeholder="Введите заголовок"
                  />
                </Form.Item>
              </Col>
              <Col xs={4}>
                <EditFormActions
                  onApprove={() => toggleField('title')}
                  onCancel={() => {
                    cancelEditForm('title');
                    toggleField('title');
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Typography.Title
              className="taskField"
              level={4}
              style={{ marginTop: 0, marginBottom: '32px' }}
              onClick={() => toggleField('title')}
            >
              {state.title}
            </Typography.Title>
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={24} style={{ marginBottom: 5 }}>
          <Typography.Text style={subtitleStyle}>Описание</Typography.Text>
        </Col>

        <Col xs={24}>
          {toggleForm.description || edit ? (
            <Row gutter={20}>
              <Col xs={20}>
                <Form.Item name="description">
                  <Input.TextArea
                    name="description"
                    value={state.description}
                    onChange={handleInputChange}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="Напишите описание"
                  />
                </Form.Item>
              </Col>
              <Col xs={4}>
                <EditFormActions
                  onApprove={() => toggleField('description')}
                  onCancel={() => {
                    cancelEditForm('description');
                    toggleField('description');
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Col
              xs={24}
              className="taskField"
              onClick={() => toggleField('description')}
            >
              <Typography.Text style={{ fontSize: '14px' }}>
                {state.description ? state.description : 'Добавить описание'}
              </Typography.Text>
            </Col>
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Typography.Text style={subtitleStyle}>Учет времени</Typography.Text>
        </Col>

        <Col xs={24}>
          {toggleForm.time || edit ? (
            <Row gutter={20}>
              <Col xs={20}>
                <Space align="center">
                  <Form.Item
                    name="startTime"
                    style={{ marginBottom: 0 }}
                    rules={[{ required: true, message: 'Время не указано' }]}
                  >
                    <TimePicker
                      name="startTime"
                      value={dayjs(state.startTime, 'HH:mm')}
                      onChange={(date: Dayjs, dateString: string | string[]) =>
                        handleTimeChange(date, dateString, 'start')
                      }
                      disabledTime={disabledTime}
                      hideDisabledOptions={true}
                      variant="filled"
                      placeholder="Начало"
                      minuteStep={5}
                      format={format}
                      needConfirm={false}
                      locale={buddhistLocale}
                    />
                  </Form.Item>
                  <SwapOutlined />
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="endTime"
                    rules={[{ required: true, message: 'Время не указано' }]}
                  >
                    <TimePicker
                      name="endTime"
                      value={dayjs(state.endTime, 'HH:mm')}
                      onChange={(date: Dayjs, dateString: string | string[]) =>
                        handleTimeChange(date, dateString, 'endTime')
                      }
                      disabledTime={disabledTime}
                      hideDisabledOptions={true}
                      variant="filled"
                      placeholder="Конец"
                      minuteStep={5}
                      format={format}
                      needConfirm={false}
                      locale={buddhistLocale}
                    />
                  </Form.Item>
                </Space>
              </Col>
              <Col xs={4}>
                <EditFormActions
                  onApprove={() => toggleField('time')}
                  onCancel={() => {
                    cancelEditForm('time');
                    toggleField('time');
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Col
              xs={24}
              className="taskField"
              onClick={() => toggleField('time')}
            >
              <Typography.Text style={{ fontSize: '14px' }}>
                {convertTime(timeSpent)}
              </Typography.Text>
            </Col>
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Typography.Text style={subtitleStyle}>Тип задачи</Typography.Text>
        </Col>

        <Col xs={24} style={{ padding: '8px' }}>
          <Dropdown
            trigger={['click']}
            menu={{
              items,
              selectable: true,
            }}
          >
            <Space style={{ cursor: 'pointer' }}>
              <TaskTag task={state} dropdown />
            </Space>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <Space style={{ padding: '8px' }}>
          <Button htmlType="submit">Сохранить</Button>
          <Button type="text" onClick={() => setEdit(false)}>
            Отменить
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export default EditTaskForm;
