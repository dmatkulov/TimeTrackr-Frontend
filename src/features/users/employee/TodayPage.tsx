import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Col, Divider, Row, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTasks } from '../../tasks/tasksSlice';
import { getTasks } from '../../tasks/tasksThunks';
import TaskItem from './components/TaskItem';

const TodayPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = new Date();
  const today = dayjs(date).format('DD MMMM, YYYY');

  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(getTasks({ date: dayjs(date).format('YYYY-MM-DD') }));
  }, []);

  return (
    <>
      <Space>
        Сегодня
        {today}
      </Space>
      <Divider style={{ marginBottom: '40px' }} />
      <Row gutter={16}>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Col
              style={{ marginBottom: 16 }}
              key={task._id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <TaskItem task={task} />{' '}
            </Col>
          ))}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Col
              key={task._id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <TaskItem task={task} />{' '}
            </Col>
          ))}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Col
              key={task._id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <TaskItem task={task} />{' '}
            </Col>
          ))}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Col
              key={task._id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <TaskItem task={task} />{' '}
            </Col>
          ))}
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Col
              key={task._id}
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 8 }}
              lg={{ span: 6 }}
            >
              <TaskItem task={task} />{' '}
            </Col>
          ))}
      </Row>
    </>
  );
};

export default TodayPage;
