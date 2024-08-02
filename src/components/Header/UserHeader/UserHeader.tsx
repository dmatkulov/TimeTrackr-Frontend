import React, { useState } from 'react';
import { Badge, Button, Drawer, Flex, Input, Space } from 'antd';
import { useAppSelector } from '../../../store/hooks/hooks';
import UserTitle from '../../UI/UserTitle/UserTitle';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { selectUser } from '../../../store/users/UsersSlice';
import {
  AppstoreOutlined,
  BellFilled,
  SearchOutlined,
} from '@ant-design/icons';
import UserMenu from '../../UserMenu/UserMenu';
import Logo from '../../UI/Logo/Logo';

interface Props {
  toggleMenu?: () => void;
}

const UserHeader: React.FC<Props> = ({ toggleMenu }) => {
  const user = useAppSelector(selectUser);

  // const mobileL = useMediaQuery({
  //   query: '(min-width: 512px) and (max-width: 768px)',
  // });

  const { md } = useBreakpoint();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const suffix = (
    <Button
      type="text"
      htmlType="submit"
      onClick={() => console.log('search')}
      size="small"
      icon={
        <SearchOutlined
          style={{
            fontSize: 16,
          }}
        />
      }
    />
  );

  return (
    user && (
      <>
        <Space>
          <Button
            icon={<AppstoreOutlined />}
            onClick={!md ? handleOpen : toggleMenu}
          />
          <Logo />
        </Space>

        <Flex align="center" justify="space-between" vertical={false}>
          {md ? (
            <>
              <Space align="center" size="large">
                <Button>Таймер</Button>
                <Input
                  autoComplete={'test'}
                  suffix={suffix}
                  allowClear
                  placeholder="Искать проекты, задачи..."
                  variant="filled"
                  style={{ maxWidth: '320px' }}
                />
                <Badge
                  count={5}
                  size="default"
                  style={{
                    display: 'block',
                    top: '2px',
                    right: '2px',
                    backgroundColor: '#52c41a',
                  }}
                >
                  <Button
                    type="text"
                    shape="circle"
                    style={{
                      backgroundColor: '#F5F5F5',
                      width: '34px',
                      height: '34px',
                    }}
                    icon={<BellFilled style={{ fontSize: 20 }} />}
                  />
                </Badge>
                <UserTitle user={user} />
              </Space>
            </>
          ) : (
            <Space size="middle" align="center">
              <Badge
                count={5}
                size="default"
                style={{
                  display: 'block',
                  top: '2px',
                  right: '2px',
                  backgroundColor: '#52c41a',
                }}
              >
                <UserTitle user={user} />
              </Badge>
            </Space>
          )}
        </Flex>

        {!md && (
          <Drawer
            title="Time Trackr"
            onClose={handleClose}
            open={open}
            styles={{ body: { display: 'flex', flexDirection: 'column' } }}
          >
            <div style={{ padding: '0 4px', margin: '30px 0' }}>
              <Input
                autoComplete={'test'}
                suffix={suffix}
                allowClear
                placeholder="Искать проекты, задачи..."
                variant="filled"
                size="large"
              />
            </div>
            <UserMenu handleMobile={handleClose} />
          </Drawer>
        )}
      </>
    )
  );
};

export default UserHeader;
