import React from 'react';
import {
  MoreOutlined,
  ProductFilled,
  RocketFilled,
  SettingFilled,
  SwapOutlined,
} from '@ant-design/icons';
import { Space, Tag } from 'antd';
import { TypeEnum } from '../../../enum/type.enum';
import { StatusEnum } from '../../../enum/status.enum';

interface Props {
  label: string;
  dropdown?: boolean;
  hasIcon?: boolean;
}

const TaskTag: React.FC<Props> = ({
  label,
  dropdown = false,
  hasIcon = false,
}) => {
  let tagColor;
  let icon;

  switch (label) {
    case TypeEnum.NEW_TASK:
      tagColor = 'processing';
      icon = <RocketFilled />;
      break;

    case TypeEnum.IMPROVEMENT:
      tagColor = 'orange';
      icon = <ProductFilled />;
      break;

    case TypeEnum.BUG:
      tagColor = 'purple';
      icon = <SettingFilled />;
      break;

    case TypeEnum.HANDOVER:
      tagColor = 'magenta';
      icon = <SwapOutlined />;
      break;

    case StatusEnum.TODO:
      tagColor = 'red';
      break;

    case StatusEnum.DONE:
      tagColor = 'green';
      break;

    case StatusEnum.IN_PROGRESS:
      tagColor = 'cyan';
      break;
  }
  return (
    <Tag
      color={tagColor}
      bordered={!hasIcon}
      icon={hasIcon && icon}
      style={{
        marginRight: 0,
        padding: '8px 10px',
      }}
    >
      {dropdown ? (
        <Space>
          {label} <MoreOutlined />
        </Space>
      ) : (
        label
      )}
    </Tag>
  );
};

export default TaskTag;
