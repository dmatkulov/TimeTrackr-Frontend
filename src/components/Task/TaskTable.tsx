import { Task } from '../../types/types.task';
import {
  Button,
  DatePicker,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableProps,
} from 'antd';
import React, { useState } from 'react';
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import UserAvatar from '../UI/UserAvatar/UserAvatar';
import TaskTag from './TaskItem/TaskTag';
import dayjs from 'dayjs';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

interface Props {
  tasks: Task[];
}

const TaskTable = ({ tasks }: Props) => {
  const { md, lg } = useBreakpoint();
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

  const [openPicker, setOpenPicker] = useState<string>('');

  const columns: TableProps<Task>['columns'] = [
    {
      title: 'Задача',
      dataIndex: 'title',
      key: 'title',
      render: (_, row: Task) => <b>{row.title}</b>,
    },
    {
      title: 'Исполнитель',
      dataIndex: 'user',
      key: 'user',
      responsive: ['lg'],
      render: (_, row: Task) => (
        <>
          <Space>
            <UserAvatar
              image={row.user.photo}
              lastname={row.user.lastname}
              firstname={row.user.firstname}
            />
            {!lg
              ? row.user.firstname
              : row.user.firstname + ' ' + row.user.lastname}
          </Space>
        </>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      responsive: ['md'],
      render: (_, row: Task) => (
        <>
          <TaskTag label={row.status} />
        </>
      ),
    },

    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      responsive: ['md'],
      render: (_, row: Task) => (
        <>
          <TaskTag label={row.type} hasIcon onlyIcon={lg} />
        </>
      ),
    },

    {
      title: 'Дедлайн',
      dataIndex: 'deadline',
      key: 'deadline',
      responsive: ['md'],
      render: (_, row: Task) => (
        <>
          {row._id === openPicker ? (
            <>
              <DatePicker
                placement="bottomRight"
                defaultOpen={true}
                showNow={false}
                needConfirm={true}
                onOk={() => setOpenPicker('')}
              />
              <div
                onClick={() => setOpenPicker('')}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                }}
              ></div>
            </>
          ) : (
            <Space size="middle">
              <Button
                type="dashed"
                icon={<CalendarOutlined />}
                onClick={() => {
                  if (row._id !== openPicker) {
                    setOpenPicker(row._id);
                  } else {
                    setOpenPicker('');
                  }
                }}
              />
              {dayjs(row.executionDate).format(!lg ? 'DD.MM' : 'DD MMMM')}
            </Space>
          )}
        </>
      ),
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
        showHeader={md}
        className="projects-table"
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0, paddingLeft: '49px' }}>
              {record.description ?? 'Нет описания'}
            </p>
          ),
          rowExpandable: (record) => record.title !== 'Not Expandable',
        }}
      />
    </>
  );
};

export default TaskTable;
