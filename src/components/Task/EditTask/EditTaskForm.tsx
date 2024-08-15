// import React, { useEffect, useState } from 'react';
// import { TaskMutation } from '../../types/types.task';
// import {
//   Button,
//   Col,
//   Dropdown,
//   Form,
//   Input,
//   MenuProps,
//   Row,
//   Space,
//   TimePicker,
//   Typography,
// } from 'antd';
// import TaskTag from '../TaskItem/TaskTag';
// import { SwapOutlined } from '@ant-design/icons';
// import { TaskLabelEnum } from '../../enum/label.enum';
// import dayjs, { Dayjs } from 'dayjs';
// import EditFormActions from './EditFormActions';
// import {
//   rowStyle,
//   subtitleStyle,
// } from '../../containers/Tasks/TaskModal/taskModalStyles';
// import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
// import {
//   selectEditForm,
//   selectTaskUpdateLoading,
//   toggleEditForm,
// } from '../../store/utils/tasks/tasksSlice';
// import {
//   buddhistLocale,
//   convertTime,
//   disabledTime,
//   format,
// } from '../../utils/formattedTime.service';
//
// interface Props {
//   task: TaskMutation;
//   onSubmit: (task: TaskMutation) => void;
//   timeSpent: number;
// }
//
// interface TaskEdit {
//   title: boolean;
//   description: boolean;
//   time: boolean;
// }
//
// const initialState: TaskEdit = {
//   title: false,
//   description: false,
//   time: false,
// };
//
// const EditTaskForm: React.FC<Props> = ({ task, onSubmit, timeSpent }) => {
//   const dispatch = useAppDispatch();
//   const isEdit = useAppSelector(selectEditForm);
//   const isLoading = useAppSelector(selectTaskUpdateLoading);
//   const [form] = Form.useForm();
//   const [state, setState] = useState<TaskMutation>(task);
//   const [toggleForm, setToggleForm] = useState<TaskEdit>(initialState);
//
//   useEffect(() => {
//     setState(task);
//     form.setFieldsValue({
//       ...task,
//       startTime: dayjs(task.startTime, 'HH:mm'),
//       endTime: dayjs(task.endTime, 'HH:mm'),
//     });
//     setToggleForm(initialState);
//   }, [task, form]);
//
//   const handleSubmit = () => {
//     onSubmit(state);
//     dispatch(toggleEditForm(false));
//   };
//
//   const toggleField = (field: keyof TaskEdit) => {
//     setToggleForm((prevState) => ({
//       ...prevState,
//       [field]: !prevState[field],
//     }));
//
//     const keys = Object.keys(toggleForm) as (keyof TaskEdit)[];
//
//     keys.forEach((key) => {
//       if (key !== field) {
//         setToggleForm((prevState) => ({
//           ...prevState,
//           [key]: false,
//         }));
//       }
//     });
//   };
//
//   const cancelEditForm = (field: keyof TaskMutation | 'time') => {
//     if (field === 'time') {
//       setState((prevState) => ({
//         ...prevState,
//         startTime: task.startTime,
//         endTime: task.endTime,
//       }));
//       form.setFieldsValue({
//         startTime: dayjs(task.startTime, 'HH:mm'),
//         endTime: dayjs(task.endTime, 'HH:mm'),
//       });
//     } else {
//       setState((prevState) => ({
//         ...prevState,
//         [field]: task[field],
//       }));
//       form.setFieldsValue({
//         [field]: task[field],
//       });
//     }
//   };
//
//   const handleLabelChange = async (value: string) => {
//     if (!isEdit) {
//       onSubmit({ ...state, label: value });
//     }
//     setState((prevState) => ({ ...prevState, label: value }));
//   };
//
//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = event.target;
//
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//
//   const handleTimeChange = (
//     _date: Dayjs,
//     dateString: string | string[],
//     name: string,
//   ) => {
//     if (typeof dateString === 'string') {
//       setState((prevState) => ({
//         ...prevState,
//         [name]: dateString,
//       }));
//     }
//   };
//
//   const sendUpdate = async (field: keyof TaskEdit) => {
//     onSubmit(state);
//     toggleField(field);
//   };
//
//   const items: MenuProps['items'] = Object.values(TaskLabelEnum).map(
//     (task) => ({
//       key: task,
//       label: task,
//       onClick: async () => handleLabelChange(task),
//     }),
//   );
//
//   return (
//     <Form form={form} layout="vertical" onFinish={handleSubmit}>
//       <Row style={rowStyle}>
//         <Col xs={24}>
//           {toggleForm.title || isEdit ? (
//             <Row gutter={20}>
//               <Col xs={isEdit ? 24 : 20}>
//                 <Form.Item
//                   name="title"
//                   rules={[{ required: true, message: 'Введите заголовок' }]}
//                 >
//                   <Input
//                     style={{ height: '44px' }}
//                     name="title"
//                     value={state.title}
//                     onChange={handleInputChange}
//                     placeholder="Введите заголовок"
//                   />
//                 </Form.Item>
//               </Col>
//               {!isEdit && (
//                 <Col xs={4}>
//                   <EditFormActions
//                     isLoading={isLoading}
//                     onApprove={() => sendUpdate('title')}
//                     onCancel={() => {
//                       cancelEditForm('title');
//                       toggleField('title');
//                     }}
//                   />
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <Typography.Title
//               className="taskField"
//               level={4}
//               onClick={() => toggleField('title')}
//             >
//               {state.title}
//             </Typography.Title>
//           )}
//         </Col>
//       </Row>
//
//       <Row style={rowStyle}>
//         <Col xs={24} style={{ marginBottom: 5 }}>
//           <Typography.Text style={subtitleStyle}>Описание</Typography.Text>
//         </Col>
//
//         <Col xs={24}>
//           {toggleForm.description || isEdit ? (
//             <Row gutter={20}>
//               <Col xs={isEdit ? 24 : 20}>
//                 <Form.Item name="description">
//                   <Input.TextArea
//                     name="description"
//                     value={state.description}
//                     onChange={handleInputChange}
//                     autoSize={{ minRows: 3, maxRows: 5 }}
//                     placeholder="Напишите описание"
//                   />
//                 </Form.Item>
//               </Col>
//               {!isEdit && (
//                 <Col xs={4}>
//                   <EditFormActions
//                     isLoading={isLoading}
//                     onApprove={() => sendUpdate('description')}
//                     onCancel={() => {
//                       cancelEditForm('description');
//                       toggleField('description');
//                     }}
//                   />
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <Col
//               xs={24}
//               className="taskField"
//               onClick={() => toggleField('description')}
//             >
//               <Typography.Text style={{ fontSize: '14px' }}>
//                 {state.description ? state.description : 'Добавить описание'}
//               </Typography.Text>
//             </Col>
//           )}
//         </Col>
//       </Row>
//
//       <Row style={rowStyle}>
//         <Col xs={24}>
//           <Typography.Text style={subtitleStyle}>Учет времени</Typography.Text>
//         </Col>
//
//         <Col xs={24}>
//           {toggleForm.time || isEdit ? (
//             <Row gutter={20}>
//               <Col xs={20}>
//                 <Space align="center">
//                   <Form.Item
//                     name="startTime"
//                     style={{ marginBottom: 0 }}
//                     rules={[{ required: true, message: 'Время не указано' }]}
//                   >
//                     <TimePicker
//                       name="startTime"
//                       value={dayjs(state.startTime, 'HH:mm')}
//                       onChange={(date: Dayjs, dateString: string | string[]) =>
//                         handleTimeChange(date, dateString, 'start')
//                       }
//                       disabledTime={disabledTime}
//                       hideDisabledOptions={true}
//                       variant="filled"
//                       placeholder="Начало"
//                       minuteStep={5}
//                       format={format}
//                       needConfirm={false}
//                       locale={buddhistLocale}
//                     />
//                   </Form.Item>
//                   <SwapOutlined />
//                   <Form.Item
//                     style={{ marginBottom: 0 }}
//                     name="endTime"
//                     rules={[{ required: true, message: 'Время не указано' }]}
//                   >
//                     <TimePicker
//                       name="endTime"
//                       value={dayjs(state.endTime, 'HH:mm')}
//                       onChange={(date: Dayjs, dateString: string | string[]) =>
//                         handleTimeChange(date, dateString, 'endTime')
//                       }
//                       disabledTime={disabledTime}
//                       hideDisabledOptions={true}
//                       variant="filled"
//                       placeholder="Конец"
//                       minuteStep={5}
//                       format={format}
//                       needConfirm={false}
//                       locale={buddhistLocale}
//                     />
//                   </Form.Item>
//                 </Space>
//               </Col>
//               {!isEdit && (
//                 <Col xs={4}>
//                   <EditFormActions
//                     isLoading={isLoading}
//                     onApprove={() => sendUpdate('time')}
//                     onCancel={() => {
//                       cancelEditForm('time');
//                       toggleField('time');
//                     }}
//                   />
//                 </Col>
//               )}
//             </Row>
//           ) : (
//             <Col
//               xs={24}
//               className="taskField"
//               onClick={() => toggleField('time')}
//             >
//               <Typography.Text style={{ fontSize: '14px' }}>
//                 {convertTime(timeSpent)}
//               </Typography.Text>
//             </Col>
//           )}
//         </Col>
//       </Row>
//
//       <Row>
//         <Col xs={24}>
//           <Typography.Text style={subtitleStyle}>Тип задачи</Typography.Text>
//         </Col>
//
//         <Col xs={24} style={{ padding: '8px' }}>
//           <Dropdown
//             trigger={['click']}
//             menu={{
//               items,
//               selectable: true,
//             }}
//           >
//             <Space style={{ cursor: 'pointer' }}>
//               <TaskTag task={state} dropdown />
//             </Space>
//           </Dropdown>
//         </Col>
//       </Row>
//
//       {isEdit && (
//         <Row>
//           <Space style={{ padding: '8px' }}>
//             <Button
//               loading={isLoading}
//               disabled={isLoading}
//               type="primary"
//               htmlType="submit"
//             >
//               Сохранить
//             </Button>
//             <Button type="text" onClick={() => dispatch(toggleEditForm(false))}>
//               Отменить
//             </Button>
//           </Space>
//         </Row>
//       )}
//     </Form>
//   );
// };
//
// export default EditTaskForm;
