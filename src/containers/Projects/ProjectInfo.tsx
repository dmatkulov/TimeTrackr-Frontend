import React, { useState } from 'react';
import { ProjectSummary } from '../../types/types.project';
import {
  Badge,
  Button,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useAppSelector } from '../../store/hooks/hooks';
import { selectUser } from '../../store/services/auth/authSlice';
import { Roles } from '../../enum/roles.enum';
import TaskTable from '../../components/Task/TaskTable';

const blockStyle = {
  background: '#eee',
  padding: '24px',
  borderRadius: '16px',
};

interface Props {
  projectSummary: ProjectSummary;
}

const ProjectInfo: React.FC<Props> = ({ projectSummary }) => {
  const { sm } = useBreakpoint();
  const user = useAppSelector(selectUser);
  const isTeamLead = user.roles.includes(Roles.TeamLead);

  const { project, tasks } = projectSummary;

  const [toggleBtn, setToggleBtn] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const addBtn = (
    <Button
      type="text"
      icon={<PlusCircleFilled />}
      onClick={() => setOpenModal(true)}
    >
      Добавить задачу
    </Button>
  );

  console.log(openModal);

  return (
    <>
      <Row gutter={16} justify="space-between">
        <Col
          xs={24}
          style={{
            ...blockStyle,
            background: 'white',
          }}
        >
          <Flex
            vertical={!sm}
            gap={24}
            justify="space-between"
            align={!sm ? 'flex-start' : 'center'}
          >
            {isTeamLead && (
              <Space
                key="1"
                align="center"
                style={{
                  border: '1px solid #aeaeae',
                  width: toggleBtn ? '260px' : '34px',
                  height: '34px',
                  borderRadius: '8px',
                  transition: 'width 0.4s ease',
                  overflow: 'hidden',
                }}
              >
                <Button
                  type="text"
                  onClick={() => {
                    setToggleBtn(!toggleBtn);
                  }}
                  icon={<MoreOutlined />}
                />
                <Space size="small">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    // onClick={() => setShow(true)}
                    size="small"
                  >
                    Изменить
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    icon={<DeleteOutlined />}
                    // disabled={isDeleting}
                    // onClick={handleDeleteTeam}
                  >
                    Удалить
                  </Button>
                </Space>
              </Space>
            )}
          </Flex>

          <Typography.Title style={{ marginBottom: '30px' }}>
            {project.name}
          </Typography.Title>
          {project.description && (
            <div>
              <Divider />
              <Typography.Text style={{ color: '#7c7c7c' }}>
                {project.description}
              </Typography.Text>
            </div>
          )}
        </Col>
      </Row>

      <Row gutter={16} justify="space-between">
        <Col xs={24} style={{ margin: '50px 0 30px 0' }}>
          <Flex justify="space-between" align="center">
            {tasks.length > 0 ? (
              <Space>
                <Typography.Text>Задачи</Typography.Text>
                <Badge count={tasks.length} />
              </Space>
            ) : (
              <Typography.Text>Задачи отсуствуют</Typography.Text>
            )}
            {isTeamLead && addBtn}
          </Flex>
        </Col>
      </Row>
      <TaskTable tasks={tasks} />
    </>
  );
};

export default ProjectInfo;
