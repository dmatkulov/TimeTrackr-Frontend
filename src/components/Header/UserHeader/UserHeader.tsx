import React from 'react';
import {
  Badge,
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Space,
  Typography,
} from 'antd';
import { appRoutes } from '../../../services/routes.service';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { logOut } from '../../../store/users/UsersThunks';
import { useNavigate } from 'react-router-dom';
import MobileMenu from '../../UI/AppBar/MobileMenu';
import UserTitle from '../../UI/UserTitle/UserTitle';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { selectUser } from '../../../store/users/UsersSlice';
import { BellFilled, SearchOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Link } = Typography;

const UserHeader: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mobileL = useMediaQuery({
    query: '(min-width: 512px) and (max-width: 768px)',
  });

  const { md } = useBreakpoint();

  const logOutUser = async () => {
    await dispatch(logOut());
    navigate(appRoutes.auth);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href={appRoutes.employee.dashboard}>Мой кабинет</Link>,
    },
    {
      key: '2',
      danger: true,
      label: 'Выйти',
      onClick: logOutUser,
    },
  ];

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
        <Flex align="center" justify="space-between" vertical={false}>
          {md ? (
            <>
              <Space
                align="center"
                size="middle"
                style={{ marginRight: '40px' }}
              >
                <Button>Запустить таймер</Button>
                <Input
                  autoComplete={'test'}
                  suffix={suffix}
                  allowClear
                  placeholder="Искать проекты, задачи..."
                  variant="filled"
                  style={{ maxWidth: '320px' }}
                />
              </Space>
              <Space size="middle" align="center">
                <Badge count={5} size="small" style={{ display: 'block' }}>
                  <Button
                    type="text"
                    shape="circle"
                    style={{
                      background: '#F0F0F0',
                      width: '34px',
                      height: '34px',
                    }}
                    icon={<BellFilled style={{ fontSize: 18 }} />}
                  />
                </Badge>
                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                  <div>
                    <UserTitle user={user} />
                  </div>
                </Dropdown>
              </Space>
            </>
          ) : (
            <Space size="middle" align="center">
              {mobileL ? (
                <Input
                  autoComplete={'test'}
                  suffix={suffix}
                  allowClear
                  placeholder="Искать проекты, задачи..."
                  variant="filled"
                  style={{ maxWidth: '320px', height: '32px' }}
                />
              ) : (
                <Button
                  shape="circle"
                  type="text"
                  icon={<SearchOutlined />}
                  style={{ background: '#F0F0F0' }}
                />
              )}
              <Badge count={5} size="small">
                <Button
                  type="text"
                  shape="circle"
                  style={{ background: '#F0F0F0' }}
                  icon={<BellFilled style={{ fontSize: 18 }} />}
                />
              </Badge>
              <MobileMenu user={user} />
            </Space>
          )}
        </Flex>
      </>
    )
  );
};

export default UserHeader;
