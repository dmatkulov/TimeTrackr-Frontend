import React from 'react';
import {
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
import { SearchOutlined } from '@ant-design/icons';

const { Link } = Typography;

const UserHeader: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          {md && (
            <Space align="center" size="large" style={{ marginRight: '40px' }}>
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
          )}
          {!md ? (
            <Space size="middle">
              <Button icon={<SearchOutlined />} />
              <MobileMenu user={user} />
            </Space>
          ) : (
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <div>
                <UserTitle user={user} />
              </div>
            </Dropdown>
          )}
        </Flex>
      </>
    )
  );
};

export default UserHeader;
