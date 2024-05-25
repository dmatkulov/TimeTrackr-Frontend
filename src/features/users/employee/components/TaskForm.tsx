// import React, { useState } from 'react';
// import {
//   Button,
//   Card,
//   Col,
//   DatePicker,
//   Drawer,
//   Form,
//   Input,
//   Row,
//   Select,
//   TimePicker,
// } from 'antd';
// import { TaskItem, TaskMutation } from '../../../../types/types.task';
//
// import buddhistEra from 'dayjs/plugin/buddhistEra';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import { buddhistLocale, TaskLabel } from '../../../../utils/constants';
// import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
//
// dayjs.extend(buddhistEra);
// dayjs.extend(utc);
// dayjs.extend(timezone);
//
// type DisabledTimes = {
//   disabledHours?: () => number[];
//   disabledMinutes?: (selectedHour: number) => number[];
//   disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
// };
//
// const initialState: TaskMutation = {
//   executionDate: dayjs(new Date()).format('YYYY-MM-DD'),
//   tasks: [
//     {
//       startTime: '',
//       endTime: '',
//       title: '',
//       description: '',
//       label: '',
//     },
//   ],
// };
//
// interface Props {
//   open: boolean;
//   onClose: () => void;
// }
//
// const TaskForm: React.FC<Props> = ({ open, onClose }) => {
//   const [form] = Form.useForm();
//   const labelOptions = Object.keys(TaskLabel);
//   const [state, setState] = useState<TaskMutation>(initialState);
//   const format = 'HH:mm';
//   const disabledTime = (): DisabledTimes => {
//     return {
//       disabledHours: () => {
//         const disabled: number[] = [];
//         for (let i = 0; i < 24; i++) {
//           if (i < 9 || i > 18) {
//             disabled.push(i);
//           }
//         }
//         return disabled;
//       },
//     };
//   };
//
//   const onSubmit = () => {
//     console.log(taskList);
//   };
//
//   const addTask = () => {
//     setTaskList((prevTaskList) => [
//       ...prevTaskList,
//       {
//         startTime: '',
//         endTime: '',
//         title: '',
//         description: '',
//         label: '',
//       },
//     ]);
//   };
//
//   const removeTask = (i: number) => {
//     setTaskList((prevState) => {
//       const newTasks = [...prevState];
//       newTasks.splice(i, 1);
//       return newTasks;
//     });
//   };
//
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     i: number,
//   ) => {
//     const { name, value } = e.target;
//
//     const newTasks = [...taskList];
//     newTasks[i][name as keyof TaskItem] = value;
//     setTaskList(newTasks);
//   };
//
//   return (
//     <Drawer
//       title="Новая заадча"
//       width={440}
//       onClose={onClose}
//       open={open}
//       forceRender
//       styles={{
//         body: {
//           paddingBottom: 80,
//         },
//       }}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         autoComplete="off"
//         onFinish={onSubmit}
//       >
//         <Row gutter={16}>
//           <Col xs={{ span: 24 }}>
//             <Form.Item
//               label="День выполнения"
//               name="executionDate"
//               rules={[
//                 {
//                   type: 'object' as const,
//                   required: true,
//                   message: 'Введите дату',
//                 },
//               ]}
//             >
//               <DatePicker
//                 name="executionDate"
//                 style={{ width: '100%' }}
//                 allowClear={false}
//                 value={state.executionDate}
//                 onChange={(_date, dateString) => {
//                   if (typeof dateString === 'string') {
//                     setState((prevState) => {
//                       return {
//                         ...prevState,
//                         executionDate: new Date(dateString).toISOString(),
//                       };
//                     });
//                   }
//                 }}
//                 locale={buddhistLocale}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//
//         {state.tasks.map((task, index: number) => (
//           <div key={index}>
//             <Card
//               size="small"
//               title={`Задача ${index + 1}`}
//               style={{ marginBottom: '15px' }}
//               extra={
//                 state.tasks.length > 1 && (
//                   <CloseOutlined onClick={() => removeTask(index)} />
//                 )
//               }
//             >
//               <Row gutter={16}>
//                 <Col xs={{ span: 12 }}>
//                   <Form.Item
//                     label="Начало"
//                     name={[index, 'startTime']}
//                     rules={[{ required: true, message: 'Время не указано' }]}
//                   >
//                     <TimePicker
//                       // name="startTime"
//                       placeholder="Начало"
//                       variant="filled"
//                       disabledTime={disabledTime}
//                       hideDisabledOptions={true}
//                       value={dayjs(task.startTime)}
//                       minuteStep={5}
//                       format={format}
//                       needConfirm={false}
//                       locale={buddhistLocale}
//                       onChange={(_, dateStrings: string | string[]) =>
//                         handleTimeChange(dateStrings, index, 'startTime')
//                       }
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col xs={{ span: 12 }}>
//                   <Form.Item
//                     label="Конец"
//                     name={[index, 'endTime']}
//                     rules={[{ required: true, message: 'Время не указано' }]}
//                   >
//                     <TimePicker
//                       // name="endTime"
//                       variant="filled"
//                       placeholder="Конец"
//                       disabledTime={disabledTime}
//                       hideDisabledOptions={true}
//                       onChange={(_, dateStrings: string | string[]) =>
//                         handleTimeChange(dateStrings, index, 'endTime')
//                       }
//                       value={dayjs(task.endTime)}
//                       minuteStep={5}
//                       format={format}
//                       needConfirm={false}
//                       locale={buddhistLocale}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={{ span: 24 }}>
//                   <Form.Item
//                     label="Заголовок"
//                     name={[index, 'title']}
//                     rules={[{ required: true, message: 'Введите заголовок' }]}
//                   >
//                     <Input
//                       name="title"
//                       value={task.title}
//                       placeholder="Заголовок..."
//                       onChange={(event) => handleInputChange(event, index)}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col xs={{ span: 24 }}>
//                   <Form.Item label="Описание" name={[index, 'description']}>
//                     <Input.TextArea
//                       autoSize={{ minRows: 3, maxRows: 5 }}
//                       value={task.description}
//                       name="description"
//                       placeholder="Необязательно"
//                       onChange={(event) => handleInputChange(event, index)}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Form.Item name={[index, 'label']} label="Тип задачи">
//                     <Select
//                       value={task.label}
//                       // onChange={(value) =>
//                       //   setTaskList((prevState) => {
//                       //     const tasks = [...prevState];
//                       //     tasks[index].label = value;
//                       //     return tasks;
//                       //   })
//                       // }
//                       options={[
//                         ...labelOptions.map((label) => ({
//                           value: label,
//                           label: label,
//                         })),
//                       ]}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//             </Card>
//             {state.tasks.length - 1 === index && (
//               <Row>
//                 <Col xs={{ span: 24 }}>
//                   <Form.Item>
//                     <Button
//                       type="dashed"
//                       onClick={addTask}
//                       block
//                       icon={<PlusOutlined />}
//                     >
//                       Добавить задачу
//                     </Button>
//                   </Form.Item>
//                 </Col>
//               </Row>
//             )}
//           </div>
//         ))}
//         <Row gutter={16} style={{ justifyContent: 'flex-end' }}>
//           <Col xs={{ span: 24 }} md={{ span: 8 }}>
//             <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
//               Сохранить
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </Drawer>
//   );
// };
//
// export default TaskForm;
