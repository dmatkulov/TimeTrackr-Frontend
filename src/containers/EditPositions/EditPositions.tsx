import React from 'react';
import PositionForm from '../../components/PositionForm/PositionForm';
import { selectOnePosition } from '../../store/features/positions/positionsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { PositionMutation } from '../../types/types.position';
import {
  fetchPositions,
  updatePosition,
} from '../../store/features/positions/positionsThunks';

interface Props {
  open: boolean;
  onClose: () => void;
}

const EditPositions: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const position = useAppSelector(selectOnePosition);

  const handleSubmitUpdate = async (state: PositionMutation) => {
    if (position) {
      await dispatch(updatePosition({ id: position._id, mutation: state }));
      await dispatch(fetchPositions());
    }
    onClose();
  };

  if (position) {
    const mutation: PositionMutation = {
      name: position.name,
      tag: position.tag,
    };

    return (
      <PositionForm
        existingItem={mutation}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmitUpdate}
        isEdit
      />
    );
  }
};

export default EditPositions;
