import { ProjectSummary } from '../../types/types.project';
import {
  Button,
  Dropdown,
  MenuProps,
  Space,
  Table,
  TableProps,
  Tag,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  StopOutlined,
} from '@ant-design/icons';

const tagStyle = {
  backgroundColor: '#52c41a',
  padding: '0 12px',
  borderRadius: '12px',
  display: 'inline-block',
};

interface Props {
  projects: ProjectSummary[];
  handleStatus: (value: boolean, projects: string[]) => void;
}

const ProjectsTable = ({ projects, handleStatus }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys as string[]);
    },
  };

  const handleToggleStatus = (value: boolean) => {
    handleStatus(value, selected);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Редактировать',
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <EditOutlined />,
    },
    {
      key: '2',
      label: 'Завершить',
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <StopOutlined />,
    },
    {
      key: '3',
      danger: true,
      label: 'Удалить',
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <DeleteOutlined />,
    },
  ];

  const isDoneBtn = (
    <Button
      type="primary"
      style={{ marginLeft: 'auto', margin: '16px 0' }}
      onClick={() => handleToggleStatus(true)}
    >
      Завершить
    </Button>
  );

  const isNotDoneBtn = (
    <Button
      type="dashed"
      style={{ marginLeft: 'auto', margin: '16px 0' }}
      onClick={() => handleToggleStatus(false)}
    >
      Возобновить
    </Button>
  );

  const dataSource = projects.map((project) => ({
    ...project,
    key: project._id,
  }));

  const columns: TableProps<ProjectSummary>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, row: ProjectSummary) => <>{row.name}</>,
    },

    {
      title: 'Задачи',
      dataIndex: 'tasks',
      key: 'tasks',
      sorter: (a, b) => a.tasks - b.tasks,
      render: (_, row) => (
        <>
          {row.tasks > 0 ? (
            <div
              style={{
                ...tagStyle,
                color: 'white',
              }}
            >
              {row.tasks}
            </div>
          ) : (
            <div
              style={{
                ...tagStyle,
                backgroundColor: '#efefef',
              }}
            >
              Нет задач
            </div>
          )}
        </>
      ),
    },

    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => Number(a.isDone) - Number(b.isDone),
      render: (_, row) => (
        <>
          {row.isDone ? (
            <Tag color="green">Завершен</Tag>
          ) : (
            <Tag color="red">В работе</Tag>
          )}
        </>
      ),
    },

    {
      title: 'Дедлайн',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (_, row: ProjectSummary) => (
        <>{dayjs(row.deadline).format('D MMMM, YYYY')}</>
      ),
    },

    {
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      hidden: selected.length > 0,
      render: () => (
        <>
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            overlayStyle={{ zIndex: 10 }}
            trigger={['click']}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        </>
      ),
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      hidden: selected.length === 0,
      render: (_, row: ProjectSummary) => (
        <>{row.isDone ? isNotDoneBtn : isDoneBtn}</>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={
          selected.length > 0
            ? false
            : {
                pageSize: 8,
                position: ['bottomRight'],
              }
        }
      />
      {selected.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Space>
            {isNotDoneBtn}
            {isDoneBtn}
          </Space>
        </div>
      )}
    </>
  );
};

export default ProjectsTable;
