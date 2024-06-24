import React from 'react';
import { Button, Divider, Flex, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import dayjs from 'dayjs';

interface Props {
  date: string;
  handleOpen: () => void;
}

const PageHeader: React.FC<Props> = ({ date, handleOpen }) => {
  const xxs = useMediaQuery({
    query: '(max-width: 480px)',
  });

  const dayString = dayjs(date).format('D MMMM, dddd');
  const isToday = dayjs(date).isSame(dayjs(), 'day');

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4} style={{ margin: 0 }}>
          {isToday && 'Сегодня '}
          {dayString}
        </Typography.Title>
        <Button
          onClick={handleOpen}
          type="primary"
          icon={<PlusOutlined />}
          iconPosition="start"
          style={{
            position: xxs ? 'fixed' : 'relative',
            bottom: xxs ? '25px' : 'auto',
            left: xxs ? '50%' : '0',
            transform: xxs ? 'translateX(-50%)' : 'none',
            zIndex: 10,
          }}
        >
          Новая задача
        </Button>
        {xxs && (
          <div
            style={{
              height: '150px',
              background:
                'linear-gradient(180deg, rgb(245 245 245 / 0%) 0%, rgb(245, 245, 245) 100%)',
              position: xxs ? 'fixed' : 'relative',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              zIndex: 5,
            }}
          />
        )}
      </Flex>
      <Divider style={{ marginBottom: '40px' }} />
    </>
  );
};

export default PageHeader;
