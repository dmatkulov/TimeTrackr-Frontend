import React, { CSSProperties, useEffect, useState } from 'react';
import { Task, TaskMutation } from '../../../../types/types.task';
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormProps,
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
  formattedTime,
} from '../../../../utils/constants';
import TaskTag from '../TaskTag';
import { SwapOutlined } from '@ant-design/icons';
import { gray } from '@ant-design/colors';
import { labelOptions } from '../../../../utils/labelOptions';
import dayjs, { Dayjs } from 'dayjs';
import EditFormActions from './EditFormActions';

const subtitleStyle: CSSProperties = {
  fontWeight: 'bolder',
  paddingLeft: '8px',
  color: gray[1],
  marginBottom: '16px',
};

interface Props {
  task: Task;
}

const EditTaskForm: React.FC<Props> = ({ task }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<Task>(task);

  useEffect(() => {
    form.setFieldsValue({
      ...task,
      startTime: dayjs(task.startTime, 'HH:mm'),
      endTime: dayjs(task.endTime, 'HH:mm'),
    });
  }, [task, form]);

  const handleSubmit: FormProps<TaskMutation>['onFinish'] = async (values) => {
    const formattedTasks: TaskMutation = {
      ...values,
      startTime: formattedTime(values.startTime),
      endTime: formattedTime(values.endTime),
      label: state.label,
    };

    console.log(state, formattedTasks);
  };

  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const handleLabelChange = (value: string) => {
    setState((prevState) => ({ ...prevState, label: value }));
  };

  const toggleTitle = () => {
    setShowTitle(!showTitle);
  };

  const toggleDesc = () => {
    setShowDesc(!showDesc);
  };
  const toggleTime = () => {
    setShowTime(!showTime);
  };

  const defaultItem = {
    key: 'Изменить тип задачи',
    label: 'Изменить тип задачи',
    style: { cursor: 'default' },
    disabled: true,
  };

  const items: MenuProps['items'] = [
    defaultItem,
    ...labelOptions.map((label) => ({
      key: label.value,
      label: label.value,
      onClick: () => handleLabelChange(label.value),
    })),
  ];

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
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row>
        <Col xs={24}>
          {showTitle ? (
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
                <EditFormActions onClick={toggleTitle} />
              </Col>
            </Row>
          ) : (
            <Typography.Title
              className="taskField"
              level={4}
              style={{ marginTop: 0, marginBottom: '32px' }}
              onClick={toggleTitle}
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
          {showDesc ? (
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
                <EditFormActions onClick={toggleDesc} />
              </Col>
            </Row>
          ) : (
            <Col xs={24} className="taskField" onClick={toggleDesc}>
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
          {showTime ? (
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
                      onChange={(
                        _date: Dayjs,
                        dateString: string | string[],
                      ) => {
                        if (typeof dateString === 'string') {
                          setState((prevState) => ({
                            ...prevState,
                            startTime: dateString,
                          }));
                        }
                      }}
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
                      onChange={(
                        _date: Dayjs,
                        dateString: string | string[],
                      ) => {
                        if (typeof dateString === 'string') {
                          setState((prevState) => ({
                            ...prevState,
                            endTime: dateString,
                          }));
                        }
                      }}
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
                <EditFormActions onClick={toggleTime} />
              </Col>
            </Row>
          ) : (
            <Col xs={24} className="taskField" onClick={toggleTime}>
              <Typography.Text style={{ fontSize: '14px' }}>
                <b>{convertTime(task.timeSpent)}</b>, {state.startTime}–
                {state.endTime}
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
      <Button htmlType="submit">отправить</Button>
    </Form>
  );
};

export default EditTaskForm;
