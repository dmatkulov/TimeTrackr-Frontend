import React, { useEffect, useState } from 'react';
import { Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions } from '../positions/positionsSlice';
import { getUsers } from '../users/UsersThunks';
import { fetchPositions } from '../positions/positionsThunks';

const Staff: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();

  const [selectedPosition, setSelectedPosition] = useState('');

  const fetchStaffByPosition = async (position: string) => {
    await dispatch(getUsers(position));
  };

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const handleSelectChange = async (value: string) => {
    setSelectedPosition(value);
    void fetchStaffByPosition(value);
  };

  return (
    <>
      <Space style={{ alignItems: 'center' }}>
        Сортировать
        <Select
          style={{ width: 300 }}
          placeholder="Поиск по позициям"
          optionFilterProp="children"
          options={[
            { value: '', label: 'Все сотрудники' },
            ...positions.map((position) => ({
              value: position._id,
              label: position.name,
            })),
          ]}
          onChange={handleSelectChange}
          value={selectedPosition}
        />
      </Space>
    </>
  );
};

export default Staff;
