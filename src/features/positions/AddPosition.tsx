import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import PositionForm from './components/PositionForm';
import { PositionMutation } from '../../types/types.position';
import { createPosition, fetchPositions } from './positionsThunks';

interface Props {
  open: boolean;
  onClose: () => void;
}
const AddPosition: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (state: PositionMutation) => {
    await dispatch(createPosition(state)).unwrap();
    await dispatch(fetchPositions());
  };
  return <PositionForm open={open} onClose={onClose} onSubmit={handleSubmit} />;
};

export default AddPosition;
