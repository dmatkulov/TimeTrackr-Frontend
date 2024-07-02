import React, { useCallback, useState } from 'react';
import Spinner from '../../../components/UI/Spin/Spin';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { gray } from '@ant-design/colors';
import {
  CalendarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { apiURL, formattedDay } from '../../../utils/constants';
import dayjs from 'dayjs';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectModal,
  selectOneTaskLoading,
  selectTaskDetails,
  selectTasks,
  toggleModal,
} from '../tasksSlice';
import { TaskMutation } from '../../../types/types.task';
import { editTask, getOneTask, getTasks } from '../tasksThunks';
import { colStyle } from '../styles/taskModalStyles';
import EditTaskForm from './EditTaskForm';

const TaskModal: React.FC = () => {
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const tasksData = useAppSelector(selectTasks);
  const currentDay = formattedDay(new Date().toISOString());
  const taskItem = useAppSelector(selectTaskDetails);

  const open = useAppSelector(selectModal);
  const loading = useAppSelector(selectOneTaskLoading);
  const [showBtns, setShowBtns] = useState(false);

  const handleClose = () => {
    setShowBtns(false);
    dispatch(toggleModal(false));
  };

  const doFetchAll = useCallback(async () => {
    await dispatch(getTasks({ date: currentDay }));
  }, [dispatch]);

  const handleUpdate = async (state: TaskMutation) => {
    if (tasksData && taskItem) {
      await dispatch(
        editTask({ id: tasksData._id, taskId: taskItem._id, task: state }),
      );
      await dispatch(getOneTask({ id: tasksData._id, taskId: taskItem._id }));
    }
    void doFetchAll();
    handleClose();
  };

  const src = `${apiURL}/${tasksData?.userId.photo}`;

  const avatar = tasksData?.userId.photo ? (
    <Avatar src={src} alt={tasksData?.userId.firstname} size="small" />
  ) : (
    <Avatar style={{ backgroundColor: '#f56a00' }} size="small">
      {tasksData?.userId.firstname.charAt(0)}
    </Avatar>
  );

  const date = dayjs(tasksData?.executionDate).format('D MMMM, dddd');

  return (
    <>
      <Modal
        title={[
          <Space
            key="1"
            align="center"
            style={{
              width: showBtns ? 'auto' : '32px',
              transition: 'ease-in-out',
            }}
          >
            <Button
              onClick={() => setShowBtns(!showBtns)}
              icon={<MoreOutlined />}
              style={{
                boxShadow: 'none',
              }}
            />
            {showBtns && (
              <>
                <Button
                  icon={<CopyOutlined />}
                  style={{
                    boxShadow: 'none',
                  }}
                />
                <Button
                  icon={<ShareAltOutlined />}
                  style={{
                    boxShadow: 'none',
                  }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  style={{
                    boxShadow: 'none',
                  }}
                />
                <Button style={{ boxShadow: 'none' }} icon={<EditOutlined />}>
                  {sm && 'Редактировать'}
                </Button>
              </>
            )}
          </Space>,
        ]}
        footer={[]}
        open={open}
        onCancel={handleClose}
        width={1000}
        styles={{
          body: {
            margin: '20px 0',
            borderTop: '1px solid #efefef',
            padding: '30px 0',
          },
        }}
        forceRender={true}
      >
        {loading ? (
          <Spinner />
        ) : (
          taskItem && (
            <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 15 }}>
                <EditTaskForm
                  task={taskItem}
                  onSubmit={handleUpdate}
                  timeSpent={'asd'}
                />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 1 }}>
                <Divider
                  type={!sm ? 'horizontal' : 'vertical'}
                  style={{ height: '100%' }}
                />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 8 }}
                style={{ paddingTop: '20px' }}
              >
                <Row gutter={16}>
                  <Col span={24} style={colStyle}>
                    <Space>
                      {avatar}
                      <Typography.Text style={{ color: gray.primary }}>
                        {`${tasksData?.userId.firstname} ${tasksData?.userId.lastname}`}
                      </Typography.Text>
                    </Space>
                  </Col>
                  <Col span={24} style={colStyle}>
                    <Space>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#efdbff',
                          borderRadius: '50%',
                        }}
                      >
                        <CalendarOutlined style={{ color: '#531dab' }} />
                      </div>
                      <Typography.Text style={{ color: gray.primary }}>
                        {date}
                      </Typography.Text>
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        )}
      </Modal>
    </>
  );
};

export default TaskModal;
