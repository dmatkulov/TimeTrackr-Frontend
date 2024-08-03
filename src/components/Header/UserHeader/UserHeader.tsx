import React, { ReactNode, useState } from 'react';
import { Badge, Button, Drawer, Flex, Input, Space } from 'antd';
import { useAppSelector } from '../../../store/hooks/hooks';
import UserTitle from '../../UI/UserTitle/UserTitle';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { selectUser } from '../../../store/users/UsersSlice';
import {
  AppstoreOutlined,
  BellFilled,
  CaretRightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import UserMenu from '../../UserMenu/UserMenu';
import Logo from '../../UI/Logo/Logo';
import { appRoutes } from '../../../services/routes.service';

interface Props {
  toggleMenu?: () => void;
}

const UserHeader: React.FC<Props> = ({ toggleMenu }) => {
  const user = useAppSelector(selectUser);
  const { md } = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const suffix = (
    <Button
      type={focus ? 'primary' : 'text'}
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

  const input = (
    <Input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      autoComplete={'test'}
      suffix={suffix}
      allowClear
      placeholder="Искать проекты, задачи..."
      variant="filled"
      style={{ maxWidth: '320px', paddingRight: '4px' }}
    />
  );

  const badge = (children: ReactNode) => {
    return (
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
        {children}
      </Badge>
    );
  };

  const timeBtn = (
    <Button
      shape="round"
      size="large"
      icon={<CaretRightOutlined />}
      type="primary"
      style={{ marginRight: 'auto' }}
    >
      Таймер
    </Button>
  );

  return (
    user && (
      <>
        <Space>
          <Button
            icon={<AppstoreOutlined />}
            onClick={!md ? handleOpen : toggleMenu}
          />
          <Logo link={appRoutes.employee.dashboard} />
        </Space>

        <Flex
          align="center"
          justify="flex-end"
          vertical={false}
          style={{ flexGrow: 1 }}
        >
          {md ? (
            <>
              {timeBtn}
              <Space align="center" size="large">
                {input}
                {badge(
                  <Button
                    type="text"
                    shape="circle"
                    style={{
                      backgroundColor: '#F5F5F5',
                      width: '34px',
                      height: '34px',
                    }}
                    icon={<BellFilled style={{ fontSize: 16 }} />}
                  />,
                )}
                <UserTitle user={user} />
              </Space>
            </>
          ) : (
            <Space size="middle" align="center">
              {badge(<UserTitle user={user} />)}
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
            <div style={{ padding: '0 4px', margin: '30px 0' }}>{input}</div>
            <UserMenu handleMobile={handleClose} />
          </Drawer>
        )}
      </>
    )
  );
};

export default UserHeader;
