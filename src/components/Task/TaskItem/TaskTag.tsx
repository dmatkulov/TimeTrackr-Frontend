import React from 'react';
import {
  MoreOutlined,
  ProductFilled,
  RocketFilled,
  SettingFilled,
  SwapOutlined,
} from '@ant-design/icons';
import { TypeEnum } from '../../../enum/type.enum';
import { StatusEnum } from '../../../enum/status.enum';
import { Tag } from 'antd';

interface Props {
  label: string;
  dropdown?: boolean;
  hasIcon?: boolean;
  onlyIcon?: boolean;
}

const TaskTag: React.FC<Props> = ({
  label,
  hasIcon = false,
  onlyIcon = false,
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

  let tagContent;

  if (hasIcon) {
    tagContent = !onlyIcon ? null : label;
  } else {
    tagContent = label;
  }
  return (
    <Tag
      color={tagColor}
      bordered={!hasIcon}
      icon={hasIcon && icon}
      style={{
        marginRight: 0,
        padding: '5px 8px',
        borderRadius: '8px',
      }}
    >
      {tagContent} <MoreOutlined />
    </Tag>
  );
};

export default TaskTag;
