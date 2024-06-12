import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  TimePicker,
} from 'antd';
import { TaskMutation } from '../../../types/types.task';

import buddhistEra from 'dayjs/plugin/buddhistEra';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  buddhistLocale,
  disabledTime,
  format,
  formattedDay,
  formattedTime,
} from '../../../utils/constants';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { labelOptions } from '../../../utils/labelOptions';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  onSubmit: (mutation: TaskMutation) => void;
  open: boolean;
  onClose: () => void;
  executionDate?: string;
  isToday?: boolean;
  creating: boolean;
}

const TaskForm: React.FC<Props> = ({
  onSubmit,
  open,
  onClose,
  executionDate = formattedDay(new Date()),
  isToday = false,
  creating,
}) => {
  const [form] = Form.useForm();

  const handleSubmit: FormProps<TaskMutation>['onFinish'] = async (values) => {
    const formattedTasks = values.tasks.map((task) => ({
      ...task,
      startTime: formattedTime(task.startTime),
      endTime: formattedTime(task.endTime),
    }));

    const mutation = {
      ...values,
      executionDate: new Date(formattedDay(values.executionDate)).toISOString(),
      tasks: formattedTasks,
    };

    onSubmit(mutation);
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    form.setFieldsValue({
      executionDate: dayjs(executionDate),
      tasks: [
        {
          startTime: '',
          endTime: '',
          title: '',
          description: '',
          label: labelOptions[0].value,
        },
      ],
    });
  }, [form]);

  const day = dayjs(executionDate).format('D MMMM, YYYY');

  return (
    <Drawer
      title={day}
      width={440}
      onClose={onClose}
      open={open}
      forceRender
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        {!isToday && (
          <Row gutter={16}>
            <Col xs={{ span: 24 }}>
              <Form.Item
                label="День выполнения"
                name="executionDate"
                rules={[
                  {
                    type: 'object' as const,
                    required: true,
                    message: 'Введите дату',
                  },
                ]}
              >
                <DatePicker
                  name="executionDate"
                  style={{ width: '100%' }}
                  allowClear={false}
                  locale={buddhistLocale}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Form.List name="tasks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  size="small"
                  title={`Задача ${name + 1}`}
                  key={key}
                  style={{ marginBottom: '15px' }}
                  extra={
                    fields.length > 1 && (
                      <CloseOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      />
                    )
                  }
                >
                  <Form.Item
                    {...restField}
                    style={{ marginTop: 5 }}
                    label="Укажите время"
                    name={[name, 'startTime']}
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
                  <Form.Item
                    {...restField}
                    style={{ marginTop: 5 }}
                    label="Укажите время"
                    name={[name, 'endTime']}
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
                  <Form.Item<TaskMutation['tasks']>
                    {...restField}
                    label="Заголовок"
                    name={[name, 'title']}
                    rules={[{ required: true, message: 'Введите заголовок' }]}
                  >
                    <Input placeholder="Введите заголовок" />
                  </Form.Item>
                  <Form.Item<TaskMutation['tasks']>
                    {...restField}
                    label="Описание"
                    name={[name, 'description']}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      placeholder="Напишите описание"
                    />
                  </Form.Item>
                  <Form.Item<TaskMutation['tasks']>
                    name={[name, 'label']}
                    label="Тип задачи"
                    style={{ border: 'none' }}
                    rules={[{ required: true, message: 'укажите тип задачи' }]}
                  >
                    <Select options={labelOptions} />
                  </Form.Item>
                </Card>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить задачу
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ span: 12 }} shouldUpdate>
          {() => (
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: '100%' }}
              disabled={creating}
              loading={creating}
            >
              Сохранить
            </Button>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default TaskForm;
