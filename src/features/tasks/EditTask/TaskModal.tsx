import React, { useCallback, useState } from 'react';
import Spinner from '../../../components/UI/Spin/Spin';
import { Button, Col, Divider, Modal, Row, Space, Typography } from 'antd';
import { gray } from '@ant-design/colors';
import {
  CalendarOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { currentDay } from '../../../utils/constants';
import dayjs from 'dayjs';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOneTaskLoading, selectTask, toggleModal } from '../tasksSlice';
import { TaskMutation } from '../../../types/types.task';
import { editTask, getOneTask, getTasks } from '../tasksThunks';
import { colStyle } from '../styles/taskModalStyles';
import EditTaskForm from './EditTaskForm';
import AvatarPic from '../../../components/UserAvatar/Avatar';

interface Props {
  open: boolean;
}

const TaskModal: React.FC<Props> = ({ open }) => {
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectTask);
  const loading = useAppSelector(selectOneTaskLoading);

  const date = dayjs(task?.executionDate).format('D MMMM, dddd');

  const [toggleBtn, setToggleBtn] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const handleClose = () => {
    setToggleBtn(false);
    dispatch(toggleModal(false));
    void doFetchAll();
  };

  const doFetchAll = useCallback(async () => {
    await dispatch(getTasks({ date: currentDay }));
  }, [dispatch]);

  const handleUpdate = async (state: TaskMutation) => {
    if (task) {
      await dispatch(
        editTask({ id: task.globalId, taskId: task._id, task: state }),
      );
      await dispatch(getOneTask({ id: task.globalId, taskId: task._id }));
    }
  };

  let form;

  if (task) {
    const mutation = {
      title: task.title,
      description: task.description,
      startTime: task.startTime,
      endTime: task.endTime,
      label: task.label,
    } as TaskMutation;

    form = (
      <EditTaskForm
        task={mutation}
        onSubmit={handleUpdate}
        timeSpent={task.timeSpent ? task.timeSpent : 0}
        isEdit={toggleEdit}
      />
    );
  }

  return (
    <>
      <Modal
        title={[
          <Space
            key="1"
            align="center"
            style={{
              width: toggleBtn ? 'auto' : '32px',
            }}
          >
            <Button
              onClick={() => {
                setToggleBtn(!toggleBtn);
                if (toggleEdit) {
                  setToggleEdit(false);
                }
              }}
              icon={<MoreOutlined />}
              style={{
                boxShadow: 'none',
              }}
            />
            {toggleBtn && (
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
                <Button
                  style={{ boxShadow: 'none' }}
                  icon={<EditOutlined />}
                  disabled={toggleEdit}
                  onClick={() => setToggleEdit(true)}
                >
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
            padding: '10px 0',
          },
        }}
        forceRender={true}
      >
        {loading ? (
          <Spinner />
        ) : (
          task && (
            <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 15 }}>
                {form}
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
                      <AvatarPic user={task.author} isCard />
                      <Typography.Text style={{ color: gray.primary }}>
                        {`${task.author.firstname} ${task.author.lastname}`}
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
