import React, { useCallback, useEffect } from 'react';
import { Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions } from '../positions/positionsSlice';
import { getUsers } from '../users/UsersThunks';
import { fetchPositions } from '../positions/positionsThunks';

const Staff: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchPositions());
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    void fetchAll(value);
  };

  const fetchAll = useCallback(
    async (value: string[]) => {
      if (value.includes('')) {
        await dispatch(getUsers());
      } else {
        await dispatch(getUsers(value));
      }
    },
    [dispatch],
  );

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
          defaultValue={['']}
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
