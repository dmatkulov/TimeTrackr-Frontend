import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Col,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
  Typography,
} from 'antd';
import { appRoutes } from '../../common/routes';
import { useGetSelectedTeamQuery } from '../../store/services/team/team';
import { UserSummary } from '../../types/types.user';
import UserAvatar from '../../components/UI/UserAvatar/UserAvatar';
import NoData from '../../components/UI/NoData/NoData';
import { DeleteOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

const TeamInfo: React.FC = () => {
  const { id } = useParams() as { id: string };

  const { data: team } = useGetSelectedTeamQuery(id);
  const [selected, setSelected] = useState<string[]>([]);

  const { sm } = useBreakpoint();
  const breadCrumb = (
    <Breadcrumb
      style={{ marginBottom: '30px' }}
      items={[
        {
          title: <Link to={appRoutes.user.teamsAll}>Все команды</Link>,
        },
        {
          title: team?.name || '',
        },
      ]}
    />
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys as string[]);
    },
  };

  // const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   event.stopPropagation();
  // };
  //
  // const items: MenuProps['items'] = [
  //   {
  //     key: 'favourite',
  //     label: 'Удалить из команды',
  //     onClick: async (info) => {
  //       info.domEvent.stopPropagation();
  //       // await toggleFav(team._id);
  //     },
  //   },
  // ];

  const columns: TableProps<UserSummary>['columns'] = [
    {
      title: 'Сотрудники',
      dataIndex: 'firstname',
      key: 'firstname',
      render: (_, user) => (
        <>
          <Space>
            <UserAvatar
              image={user.photo}
              lastname={user.lastname}
              firstname={user.firstname}
            />
            <Typography.Text>
              {user.firstname} {user.lastname}
            </Typography.Text>
          </Space>
        </>
      ),
    },
    {
      title: 'Позиция',
      key: 'position',
      dataIndex: 'position',
      responsive: ['sm'],
      render: (_, { position }) => (
        <Tag bordered={false} color={position?.tag}>
          {position.name}
        </Tag>
      ),
    },
    {
      title: selected.length === team?.members.length && (
        <Button type="primary" size="small">
          Удалить все
        </Button>
      ),
      align: 'end',
      hidden: !selected.length,
      key: 'actions',
      dataIndex: 'actions',
      render: (_, user) => (
        <>
          {selected.includes(user._id) && (
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              {sm && 'Удалить'}
            </Button>
          )}
        </>
      ),
    },
  ];

  const dataSource = team?.members.map((user) => ({
    ...user,
    key: user._id,
  }));

  return (
    team && (
      <>
        <div>{breadCrumb}</div>
        <main>
          {team.name}

          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <Table
                locale={{ emptyText: <NoData /> }}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  pageSize: 8,
                  position: ['bottomRight'],
                }}
              />
            </Col>
            <Col xs={24} lg={12}>
              <Table
                locale={{ emptyText: <NoData /> }}
                columns={columns}
                dataSource={dataSource}
                size="small"
                style={{ cursor: 'default' }}
                rowSelection={{
                  ...rowSelection,
                }}
                pagination={{
                  pageSize: 8,
                  position: ['bottomRight'],
                }}
              />
            </Col>
          </Row>
        </main>
      </>
    )
  );
};

export default TeamInfo;
