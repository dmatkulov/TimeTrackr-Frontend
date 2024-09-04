import { ProjectSummary } from '../../types/types.project';
import { Table, TableProps, Tag } from 'antd';
import dayjs from 'dayjs';

const tagStyle = {
  backgroundColor: '#52c41a',
  padding: '0 12px',
  borderRadius: '12px',
  display: 'inline-block',
};

interface Props {
  projects: ProjectSummary[];
}

const ProjectsTable = ({ projects }: Props) => {
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
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      // size="small"
      pagination={{
        pageSize: 8,
        position: ['bottomRight'],
      }}
    />
  );
};

export default ProjectsTable;
