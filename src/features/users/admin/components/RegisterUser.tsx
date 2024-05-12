import React from 'react';
import { Button, Drawer, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectOpenDrawer, toggleDrawer } from '../../UsersSlice';

interface Props extends React.PropsWithChildren {}
const RegisterUser: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpenDrawer);

  const onClose = () => {
    dispatch(toggleDrawer(false));
  };

  return (
    <>
      <Drawer
        title="Добавление нового сотрудника"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button htmlType="submit" form="register" type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};

export default RegisterUser;
