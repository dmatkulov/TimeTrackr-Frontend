import React from 'react';
import PositionForm from './components/PositionForm';
import { selectOnePosition, selectOnePositionLoading } from './positionsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PositionMutation } from '../../types/types.position';
import { fetchPositions, updatePosition } from './positionsThunks';
import Spinner from '../../components/UI/Spin/Spin';

interface Props {
  open: boolean;
  onClose: () => void;
}
const EditPositions: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectOnePositionLoading);
  const position = useAppSelector(selectOnePosition);

  const handleSubmitUpdate = async (state: PositionMutation) => {
    if (position) {
      await dispatch(updatePosition({ id: position._id, mutation: state }));
      await dispatch(fetchPositions());
    }
  };

  let form = <Spinner />;

  if (!loading && position) {
    const mutation: PositionMutation = {
      name: position.name,
    };

    form = (
      <PositionForm
        existingItem={mutation}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmitUpdate}
        isEdit
      />
    );
  }

  return <>{form}</>;
};

export default EditPositions;
