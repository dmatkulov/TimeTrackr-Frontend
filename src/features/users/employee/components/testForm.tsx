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
  TimePicker,
} from 'antd';
import { TaskMutation } from '../../../../types/types.task';

import buddhistEra from 'dayjs/plugin/buddhistEra';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {
  buddhistLocale,
  countTimeSpent,
  disabledTime,
  format,
  formattedDay,
  formattedTime,
} from '../../../../utils/constants';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentDay = formattedDay(new Date());

interface Props {
  open: boolean;
  onClose: () => void;
  executionDate?: string;
}
const TestTaskForm: React.FC<Props> = ({
  open,
  onClose,
  executionDate = currentDay,
}) => {
  const [form] = Form.useForm();

  const onSubmit: FormProps<TaskMutation>['onFinish'] = (values) => {
    const formattedTasks = values.tasks.map((task) => ({
      ...task,
      startTime: formattedTime(task.startTime),
      timeSpent: countTimeSpent(
        formattedTime(task.startTime),
        formattedTime(task.endTime),
      ),
      endTime: formattedTime(task.endTime),
    }));

    const state = {
      ...values,
      executionDate: new Date(formattedDay(values.executionDate)).toISOString(),
      tasks: formattedTasks,
    };

    console.log(state);
  };

  useEffect(() => {
    form.setFieldsValue({
      executionDate: dayjs(executionDate),
    });
  }, [form]);

  return (
    <Drawer
      title="Новая задача"
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
        onFinish={onSubmit}
      >
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
                    <CloseOutlined
                      onClick={() => {
                        remove(name);
                      }}
                    />
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
        <Row gutter={16} style={{ justifyContent: 'flex-end' }}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
              Сохранить
            </Button>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default TestTaskForm;
