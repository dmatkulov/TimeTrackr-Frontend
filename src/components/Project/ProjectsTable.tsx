import {
  Project,
  ProjectMutation,
  UpdateProjectArg,
} from '../../types/types.project';
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
  PauseCircleFilled,
  PlayCircleFilled,
} from '@ant-design/icons';
import ProjectForm from './ProjectForm';
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from '../../store/services/projects/projects';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../common/routes';

const tagStyle = {
  backgroundColor: '#52c41a',
  padding: '0 12px',
  borderRadius: '12px',
  display: 'inline-block',
};

interface Props {
  projects: Project[];
  handleStatus: (value: boolean, projects: string[]) => void;
}

const ProjectsTable = ({ projects, handleStatus }: Props) => {
  const user = useAppSelector(selectUser);
  const isTeamlead = user.roles.includes(Roles.TeamLead);

  const navigate = useNavigate();

  const [selected, setSelected] = useState<React.Key[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [state, setState] = useState<UpdateProjectArg>();

  const [handleUpdate, { isLoading, error, isError }] =
    useUpdateProjectMutation();

  const [handleDelete, { isLoading: deleting }] = useDeleteProjectMutation();

  const handleToggleStatus = (value: boolean) => {
    handleStatus(value, selected as string[]);
    setSelected([]);
  };

  const handleOpenForm = (project: Project) => {
    const mutation = {
      teamID: project.teamID,
      name: project.name,
      description: project.description,
      deadline: project.deadline,
      type: project.type,
    };
    setState((prevState) => ({ ...prevState, id: project._id, mutation }));
    setOpenForm(true);
  };

  const handleSubmitUpdate = async (mutation: ProjectMutation) => {
    if (state) {
      await handleUpdate({ id: state.id, mutation }).unwrap();
    }
  };

  const handleSubmitDelete = async (id: string) => {
    await handleDelete(id).unwrap();
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelected(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selected,
    onChange: onSelectChange,
  };

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
      disabled: deleting,
      onClick: (info) => {
        info.domEvent.stopPropagation();
      },
      icon: <DeleteOutlined />,
    },
  ];

  const handleDropdownClick = (
    event:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
  };

  const isDoneBtn = (
    <Button
      icon={<PauseCircleFilled />}
      danger
      type="primary"
      onClick={() => handleToggleStatus(true)}
    >
      Завершить
    </Button>
  );

  const isNotDoneBtn = (
    <Button
      icon={<PlayCircleFilled />}
      type="primary"
      onClick={() => handleToggleStatus(false)}
    >
      Возобновить
    </Button>
  );

  const dataSource = projects.map((project) => ({
    ...project,
    key: project._id,
  }));

  const columns: TableProps<Project>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, row: Project) => <>{row.name}</>,
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
      render: (_, row: Project) => (
        <>{dayjs(row.deadline).format('D MMMM, YYYY')}</>
      ),
    },

    {
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      hidden: !isTeamlead,
      render: (_, row: Project) => (
        <>
          {selected.includes(row._id) && selected.length === 1 ? (
            row.isDone ? (
              <Button
                icon={<PlayCircleFilled />}
                type="primary"
                onClick={(event) => {
                  event.stopPropagation();
                  handleToggleStatus(false);
                }}
              />
            ) : (
              <Button
                icon={<PauseCircleFilled />}
                type="primary"
                danger
                onClick={(event) => {
                  event.stopPropagation();
                  handleToggleStatus(true);
                }}
              />
            )
          ) : (
            <Dropdown
              menu={{
                items,
                onClick: async ({ key }) => {
                  if (key === 'delete') {
                    await handleSubmitDelete(row._id);
                  }
                  if (key === 'edit') {
                    handleOpenForm(row);
                  }
                },
              }}
              placement="bottomRight"
              overlayStyle={{ zIndex: 10 }}
              trigger={['click']}
              disabled={selected.length > 0}
            >
              <Button onClick={handleDropdownClick} icon={<MoreOutlined />} />
            </Dropdown>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        className="projects-table"
        dataSource={dataSource}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              navigate(appRoutes.user.teams + record.teamID + '/' + record._id);
            },
          };
        }}
        rowSelection={
          isTeamlead
            ? {
                ...rowSelection,
              }
            : undefined
        }
        pagination={
          selected.length > 1
            ? false
            : {
                pageSize: 8,
                position: ['bottomRight'],
              }
        }
      />
      {selected.length > 1 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Space style={{ marginLeft: 'auto', margin: '16px 0' }}>
            {isNotDoneBtn}
            {isDoneBtn}
          </Space>
        </div>
      )}

      <ProjectForm
        onSubmit={handleSubmitUpdate}
        existingProject={state?.mutation}
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        loading={isLoading}
        error={error}
        isError={isError}
        isEdit
      />
    </>
  );
};

export default ProjectsTable;
