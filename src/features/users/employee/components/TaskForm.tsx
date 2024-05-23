import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  TimePicker,
} from 'antd';
import { TaskMutation } from '../../../../types/types.task';

import buddhistEra from 'dayjs/plugin/buddhistEra';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { buddhistLocale, TaskLabel } from '../../../../utils/constants';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);

type DisabledTimes = {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};
const initialState: TaskMutation = {
  executionDate: dayjs(new Date()).format('YYYY-MM-DD'),
  tasks: [
    {
      startTime: '09:00',
      endTime: '18:00',
      title: '',
      description: '',
      label: TaskLabel.Development,
    },
  ],
};
interface Props {
  open: boolean;
  onClose: () => void;
}
const TaskForm: React.FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<TaskMutation>(initialState);

  const format = 'HH:mm';
  const disabledTime = (): DisabledTimes => {
    return {
      disabledHours: () => {
        const disabled: number[] = [];
        for (let i = 0; i < 24; i++) {
          if (i < 9 || i > 18) {
            disabled.push(i);
          }
        }
        return disabled;
      },
    };
  };

  useEffect(() => {
    form.setFieldsValue({
      executionDate: dayjs(state.executionDate),
      tasks: state.tasks,
    });
  }, [form, state]);

  const onSubmit = () => {
    console.log(state);
  };
  return (
    <Drawer
      title="Новая заадча"
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
                value={state.executionDate}
                onChange={(_date, dateString) => {
                  if (typeof dateString === 'string') {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        executionDate: new Date(dateString).toISOString(),
                      };
                    });
                  }
                }}
                locale={buddhistLocale}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.List name="tasks">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
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
                    name={[index, 'startTime', 'endTime']}
                    rules={[{ required: true, message: 'Время не указано' }]}
                  >
                    <TimePicker.RangePicker
                      disabledTime={disabledTime}
                      hideDisabledOptions={true}
                      variant="filled"
                      placeholder={['Начало', 'Конец']}
                      onChange={(_, dateStrings: [string, string]) => {
                        console.log(dateStrings);
                      }}
                      minuteStep={5}
                      format={format}
                      needConfirm={false}
                      value={
                        state.tasks[index] &&
                        state.tasks[index].startTime &&
                        state.tasks[index].endTime
                          ? [
                              dayjs(state.tasks[index].startTime, 'HH:mm'),
                              dayjs(state.tasks[index].endTime, 'HH:mm'),
                            ]
                          : undefined
                      }
                    />
                  </Form.Item>
                  <Form.Item<TaskMutation['tasks']>
                    {...restField}
                    label="Заголовок"
                    name={[index, 'title']}
                    rules={[{ required: true, message: 'Введите заголовок' }]}
                  >
                    <Input
                      placeholder="Введите заголовок"
                      name="title"
                      value={state.tasks[index] ? state.tasks[index].title : ''}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        const { value } = event.target;
                        setState((prevState) => {
                          const newTasks = [...prevState.tasks];
                          newTasks[name] = {
                            ...newTasks[name],
                            title: value,
                          };
                          return { ...prevState, tasks: newTasks };
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item<TaskMutation['tasks']>
                    {...restField}
                    label="Описание"
                    name={[index, 'description']}
                  >
                    <Input.TextArea
                      autoSize={{ minRows: 3, maxRows: 5 }}
                      placeholder="Напишите описание"
                      name="description"
                      value={
                        state.tasks[index] ? state.tasks[index].description : ''
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>,
                      ) => {
                        const { value } = event.target;
                        setState((prevState) => {
                          const newTasks = [...prevState.tasks];
                          newTasks[name] = {
                            ...newTasks[name],
                            description: value,
                          };
                          return { ...prevState, tasks: newTasks };
                        });
                      }}
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

export default TaskForm;
