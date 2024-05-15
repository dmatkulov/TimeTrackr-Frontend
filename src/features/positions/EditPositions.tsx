import React from 'react';
import PositionForm from './components/PositionForm';
import { selectOnePosition } from './positionsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PositionMutation } from '../../types/types.position';
import { fetchPositions, updatePosition } from './positionsThunks';

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
  };

  return (
    <>
      <PositionForm
        open={open}
        onClose={onClose}
        onSubmit={handleSubmitUpdate}
      />
    </>
  );
};

export default EditPositions;
