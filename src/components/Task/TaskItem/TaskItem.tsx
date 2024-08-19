// import React, { useCallback, useState } from 'react';
// import { Card, Dropdown, Flex, MenuProps, Space } from 'antd';
// import { Task } from '../../types/types.task';
// import {
//   ClockCircleOutlined,
//   DeleteOutlined,
//   MoreOutlined,
// } from '@ant-design/icons';
// import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
// import { useMediaQuery } from 'react-responsive';
// import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
// import {
//   selectDeleteTaskLoading,
//   selectTasks,
// } from '../../store/utils/tasks/tasksSlice';
// import TaskTag from './TaskTag';
// import { getOneTask } from '../../store/utils/tasks/tasksThunks';
// import TaskModal from '../../containers/Tasks/TaskModal/TaskModal';
// import { convertTime } from '../../utils/formattedTime.service';
//
// interface Props {
//   task: Task;
//   onDelete: (taskId: string) => void;
// }
//
// const TaskItem: React.FC<Props> = ({ task, onDelete }) => {
//   const dispatch = useAppDispatch();
//   const tasksData = useAppSelector(selectTasks);
//   const deleting = useAppSelector(selectDeleteTaskLoading);
//   const [open, setOpen] = useState(false);
//
//   const { md, lg } = useBreakpoint();
//   const lgXl = useMediaQuery({
//     query: '(min-width: 1200px) and (max-width: 1340px)',
//   });
//   const xxs = useMediaQuery({
//     query: '(min-width: 320px) and (max-width: 360px)',
//   });
//
//   const items: MenuProps['items'] = [
//     {
//       key: '1',
//       danger: true,
//       label: 'Удалить',
//       onClick: (info) => {
//         info.domEvent.stopPropagation();
//         onDelete(task._id);
//       },
//       icon: <DeleteOutlined />,
//       disabled: deleting,
//     },
//   ];
//
//   const doFetchOne = useCallback(
//     async (taskId: string) => {
//       if (tasksData) {
//         await dispatch(getOneTask({ id: tasksData?._id, taskId }));
//       }
//     },
//     [tasksData],
//   );
//
//   const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     event.stopPropagation();
//   };
//
//   const handToggleModal = (event: React.MouseEvent<HTMLDivElement>) => {
//     event.stopPropagation();
//     void doFetchOne(task._id);
//     setOpen(true);
//   };
//
//   const timeSpent = convertTime(task.timeSpent);
//
//   return (
//     <>
//       <TaskModal open={open} />
//       <Card
//         title={task.title}
//         bordered={false}
//         hoverable
//         style={{ height: '100%' }}
//         styles={{ header: { border: 'none' } }}
//         extra={
//           <Dropdown
//             menu={{ items }}
//             placement="topRight"
//             arrow
//             overlayStyle={{ zIndex: 10 }}
//             trigger={['click']}
//           >
//             <div
//               onClick={handleDropdownClick}
//               style={{
//                 width: '24px',
//                 height: '24px',
//                 border: '1px solid #fafafa',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '50%',
//                 backgroundColor: '#fafafa',
//               }}
//             >
//               <MoreOutlined />
//             </div>
//           </Dropdown>
//         }
//         onClick={handToggleModal}
//       >
//         <Flex
//           justify="space-between"
//           vertical={xxs}
//           align={(md && !lg) || xxs ? 'flex-start' : 'center'}
//           gap={12}
//           wrap={md}
//         >
//           <Space
//             size="small"
//             style={{
//               color: 'gray',
//               fontSize: '12px',
//               gap: '4px',
//               width: lgXl ? '100%' : 'auto',
//             }}
//           >
//             <ClockCircleOutlined color="blue" /> {timeSpent}
//           </Space>
//           <TaskTag task={task} />
//         </Flex>
//       </Card>
//     </>
//   );
// };
//
// export default TaskItem;
