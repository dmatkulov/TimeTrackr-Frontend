import React from 'react';
import { Button, Col, Modal, Row, Space, Typography } from 'antd';
import { EditOutlined, SwapOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectModal,
  selectTaskDetails,
  toggleModal,
} from '../../../tasks/tasksSlice';
import { selectFetchOneLoading } from '../../UsersSlice';
import Spinner from '../../../../components/UI/Spin/Spin';
import TaskTag from './TaskTag';

const TaskDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectModal);
  const taskDetails = useAppSelector(selectTaskDetails);
  const loading = useAppSelector(selectFetchOneLoading);

  const task = taskDetails?.task;

  return (
    <>
      <Modal
        footer={[
          <Button
            key="1"
            size="small"
            style={{ fontSize: '12px', boxShadow: 'none' }}
          >
            <EditOutlined />
            Редактировать
          </Button>,
          <Button
            key="2"
            size="small"
            style={{ fontSize: '12px', boxShadow: 'none' }}
            shape="round"
            type="text"
            danger
          >
            <EditOutlined />
            Удалить
          </Button>,
        ]}
        open={open}
        onCancel={() => dispatch(toggleModal(false))}
        width={1000}
        forceRender
      >
        {loading ? (
          <Spinner />
        ) : (
          taskDetails &&
          task && (
            <Row gutter={24}>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 16 }}
                style={{
                  borderRight: '1px solid #efefef',
                  paddingRight: '32px',
                }}
              >
                <Typography.Title
                  className="taskField"
                  level={4}
                  style={{ marginTop: 0, marginBottom: '32px' }}
                >
                  {task.title}
                </Typography.Title>
                <div>
                  <b style={{ paddingLeft: '8px' }}>Описание</b>
                  <p className="taskField">
                    {task.description ? (
                      task.description
                    ) : (
                      <Typography.Text
                        style={{ color: 'gray', fontSize: '14px' }}
                      >
                        Добавить описание
                      </Typography.Text>
                    )}
                  </p>
                </div>
                <Space direction="vertical">
                  <b style={{ paddingLeft: '8px' }}>Тип задачи</b>
                  <Space>
                    <TaskTag task={task} />
                    <Button
                      type="text"
                      size="small"
                      icon={<SwapOutlined style={{ color: 'gray' }} />}
                    />
                  </Space>
                </Space>
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 8 }}
                style={{ paddingLeft: '32px' }}
              >
                <p>Автор</p>
                <p>Дата</p>
                <p>Всего часов</p>
              </Col>
            </Row>
          )
        )}
      </Modal>
    </>
  );
};

export default TaskDescription;
