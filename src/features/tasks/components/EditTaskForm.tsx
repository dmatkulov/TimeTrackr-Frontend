import React, { useEffect } from 'react';
import { Task, TaskItem } from '../../../types/types.task';
import {
  Button,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  TimePicker,
  Typography,
} from 'antd';
import {
  buddhistLocale,
  disabledTime,
  format,
  formattedTime,
} from '../../../utils/constants';
import TaskTag from './TaskTag';
import { SwapOutlined } from '@ant-design/icons';
import { gray } from '@ant-design/colors';
import { labelOptions } from '../../../utils/labelOptions';
import dayjs from 'dayjs';

interface Props {
  task: Task;
}

const EditTaskForm: React.FC<Props> = ({ task }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...task,
      startTime: dayjs(task.startTime, 'HH:mm'),
      endTime: dayjs(task.endTime, 'HH:mm'),
    });
  }, [task, form]);

  const handleSubmit: FormProps<TaskItem>['onFinish'] = async (values) => {
    const formattedTasks: TaskItem = {
      ...values,
      startTime: formattedTime(values.startTime),
      endTime: formattedTime(values.endTime),
    };

    console.log(formattedTasks);
  };

  const subtitleStyle = {
    fontWeight: 'bolder',
    paddingLeft: '8px',
    color: gray[1],
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Typography.Title
        className="taskField"
        level={4}
        style={{ marginTop: 0, marginBottom: '32px' }}
      >
        {task.title}
      </Typography.Title>

      <Form.Item<TaskItem>
        name="title"
        rules={[{ required: true, message: 'Введите заголовок' }]}
      >
        <Input placeholder="Введите заголовок" />
      </Form.Item>
      <div>
        <Typography.Text style={subtitleStyle}>Описание</Typography.Text>
        <p className="taskField">
          {task.description ? (
            task.description
          ) : (
            <Typography.Text style={{ color: 'gray', fontSize: '14px' }}>
              Добавить описание
            </Typography.Text>
          )}
        </p>
        <Form.Item<TaskItem> name="description">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="Напишите описание"
          />
        </Form.Item>
      </div>
      <Form.Item<TaskItem>
        style={{ marginTop: 5 }}
        label="Укажите время"
        name="startTime"
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
        />
      </Form.Item>
      <Form.Item<TaskItem>
        style={{ marginTop: 5 }}
        label="Укажите время"
        name="endTime"
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
        />
      </Form.Item>
      <Space direction="vertical">
        <Typography.Text style={subtitleStyle}>Тип задачи</Typography.Text>
        <Space>
          <TaskTag task={task} />
          <Button
            type="text"
            size="small"
            icon={<SwapOutlined style={{ color: 'gray' }} />}
          />
        </Space>
      </Space>
      <Form.Item
        name="label"
        style={{ border: 'none' }}
        rules={[{ required: true, message: 'укажите тип задачи' }]}
      >
        <Select options={labelOptions} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTaskForm;
