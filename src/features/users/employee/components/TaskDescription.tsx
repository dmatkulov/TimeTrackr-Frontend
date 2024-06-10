import React from 'react';
import {
  Button,
  Col,
  Divider,
  Flex,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined, SwapOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  selectModal,
  selectTaskDetails,
  toggleModal,
} from '../../../tasks/tasksSlice';
import { selectFetchOneLoading } from '../../UsersSlice';
import Spinner from '../../../../components/UI/Spin/Spin';
import TaskTag from './TaskTag';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { gray } from '@ant-design/colors';

const TaskDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectModal);
  const taskDetails = useAppSelector(selectTaskDetails);
  const loading = useAppSelector(selectFetchOneLoading);

  const { sm } = useBreakpoint();

  const task = taskDetails?.task;

  const handleClose = () => dispatch(toggleModal(false));

  const subtitleStyle = {
    fontWeight: 'bolder',
    paddingLeft: '8px',
    color: gray[1],
  };

  return (
    <>
      <Modal
        footer={[
          <Flex key="1" justify="space-between" align="center">
            <Flex
              justify="space-between"
              gap={20}
              style={{ width: !sm ? '100%' : 'auto' }}
            >
              <Button style={{ boxShadow: 'none' }} type="primary">
                <EditOutlined />
                Редактировать
              </Button>
              <Button style={{ boxShadow: 'none' }} danger>
                <DeleteOutlined />
                {sm && 'Удалить'}
              </Button>
            </Flex>
            {sm && (
              <Button style={{ boxShadow: 'none' }} onClick={handleClose}>
                Закрыть
              </Button>
            )}
          </Flex>,
        ]}
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
                <Typography.Title
                  className="taskField"
                  level={4}
                  style={{ marginTop: 0, marginBottom: '32px' }}
                >
                  {task.title}
                </Typography.Title>
                <div>
                  <Typography.Text style={subtitleStyle}>
                    Описание
                  </Typography.Text>
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
                  <Typography.Text style={subtitleStyle}>
                    Тип задачи
                  </Typography.Text>
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
              <Col xs={{ span: 24 }} sm={{ span: 1 }}>
                <Divider
                  type={!sm ? 'horizontal' : 'vertical'}
                  style={{ height: '100%' }}
                />
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                <Row>
                  <Col span={8}>
                    <Typography.Text style={subtitleStyle}>
                      Автор
                    </Typography.Text>
                  </Col>
                  <Col>
                    {`${taskDetails?.userId.firstname} ${taskDetails?.userId.lastname}`}
                  </Col>
                </Row>
                <Typography.Text style={subtitleStyle}>Дата</Typography.Text>
                <Typography.Text style={subtitleStyle}>Время</Typography.Text>
              </Col>
            </Row>
          )
        )}
      </Modal>
    </>
  );
};

export default TaskDescription;
