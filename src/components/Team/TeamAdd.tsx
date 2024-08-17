import { Modal } from 'antd';
import React from 'react';
import TeamForm from './TeamForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TeamAdd: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        open={isOpen}
        title="Создать команду"
        onCancel={onClose}
        width={600}
        footer={[]}
        styles={{
          body: {
            margin: '20px 0',
            padding: '10px 0',
          },
        }}
        forceRender
      >
        <TeamForm />
      </Modal>
    </>
  );
};

export default TeamAdd;
