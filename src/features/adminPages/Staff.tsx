import React, { useEffect } from 'react';
import { Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions } from '../positions/positionsSlice';
import { getUsers } from '../users/UsersThunks';
import { fetchPositions } from '../positions/positionsThunks';

const Staff: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();

  const fetchStaffByPosition = async (positions: string[]) => {
    await dispatch(getUsers(positions));
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchPositions());
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    void fetchStaffByPosition(value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Space style={{ alignItems: 'center' }}>
        Сортировать
        <Select
          showSearch
          mode="multiple"
          allowClear
          style={{ width: 300 }}
          placeholder="Поиск по позициям"
          optionFilterProp="children"
          filterOption={filterOption}
          defaultValue={['Все сотрудники']}
          options={[
            { value: '', label: 'Все сотрудники' },
            ...positions.map((position) => ({
              value: position._id,
              label: position.name,
            })),
          ]}
          onChange={handleChange}
        />
      </Space>
    </>
  );
};

export default Staff;
