import { Task } from '../../types/types.task';
import { Button, Dropdown, MenuProps, Space, Table, TableProps } from 'antd';
import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import UserAvatar from '../UI/UserAvatar/UserAvatar';

interface Props {
  tasks: Task[];
}

const TaskTable = ({ tasks }: Props) => {
  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Редактировать',
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <EditOutlined />,
    },
    {
      key: 'delete',
      danger: true,
      label: 'Удалить',
      // disabled: deleting,
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <DeleteOutlined />,
    },
  ];

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const columns: TableProps<Task>['columns'] = [
    {
      title: 'Задача',
      dataIndex: 'title',
      key: 'title',
      render: (_, row: Task) => <>{row.title}</>,
    },
    {
      title: 'Исполнитель',
      dataIndex: 'user',
      key: 'user',
      render: (_, row: Task) => (
        <>
          <Space>
            <UserAvatar
              image={row.user.photo}
              lastname={row.user.lastname}
              firstname={row.user.firstname}
            />
            {row.user.firstname + ' ' + row.user.lastname}
          </Space>
        </>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (_, row: Task) => <>{row.status}</>,
    },

    {
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: () => (
        <>
          <Dropdown
            menu={{
              items,
              onClick: async ({ key }) => {
                if (key === 'delete') {
                  // await handleSubmitDelete(row._id);
                }
                if (key === 'edit') {
                  // handleOpenForm(row);
                }
              },
            }}
            placement="bottomRight"
            overlayStyle={{ zIndex: 10 }}
            trigger={['click']}
          >
            <Button onClick={handleDropdownClick} icon={<MoreOutlined />} />
          </Dropdown>
        </>
      ),
    },
  ];

  console.log(tasks);

  const dataSource = tasks.map((task) => ({
    ...task,
    key: task._id,
  }));

  return (
    <>
      <Table
        columns={columns}
        className="projects-table"
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description ?? 'Нет описания'}</p>
          ),
          rowExpandable: (record) => record.title !== 'Not Expandable',
        }}
      />
    </>
  );
};

export default TaskTable;
