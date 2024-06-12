import React from 'react';
import { Col, Divider, Modal, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectModal, selectTaskDetails, toggleModal } from '../tasksSlice';
import { selectFetchOneLoading } from '../../users/UsersSlice';
import Spinner from '../../../components/UI/Spin/Spin';
import EditTaskForm from './EditTaskForm';
import TaskModalFooter from './TaskModalFooter';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import TaskInfo from './TaskInfo';

const TaskDescription: React.FC = () => {
  const { sm } = useBreakpoint();
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectModal);
  const taskDetails = useAppSelector(selectTaskDetails);
  const loading = useAppSelector(selectFetchOneLoading);
  const task = taskDetails?.task;

  const handleClose = () => dispatch(toggleModal(false));

  return (
    <>
      <Modal
        footer={[<TaskModalFooter key="1" onClose={handleClose} />]}
        open={open}
        onCancel={handleClose}
        width={1000}
        styles={{
          body: {
            marginBottom: '30px',
            borderBottom: '1px solid #efefef',
            paddingBottom: '30px',
          },
        }}
        forceRender
      >
        {loading ? (
          <Spinner />
        ) : (
          taskDetails &&
          task && (
            <Row gutter={24}>
              <Col xs={{ span: 24 }} sm={{ span: 15 }}>
                <EditTaskForm task={task} />
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
                <TaskInfo
                  author={taskDetails.userId}
                  executionDate={taskDetails.executionDate}
                />
              </Col>
            </Row>
          )
        )}
      </Modal>
    </>
  );
};

export default TaskDescription;
