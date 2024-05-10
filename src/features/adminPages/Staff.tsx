import React, { useCallback, useEffect } from 'react';
import { Input, Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPositions } from '../positions/positionsSlice';
import { getUsers } from '../users/UsersThunks';
import { fetchPositions } from '../positions/positionsThunks';
import { SearchProps } from 'antd/es/input';
import { selectStaff } from '../users/UsersSlice';

const { Search } = Input;

const Staff: React.FC = () => {
  const positions = useAppSelector(selectPositions);
  const dispatch = useAppDispatch();
  const staff = useAppSelector(selectStaff);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchPositions());
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    void fetchStaff(value);
  };

  const fetchStaff = useCallback(
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

  const onSearch: SearchProps['onSearch'] = (value) => {
    const searched = staff.filter((user) => {
      const lowercaseLastname = user.lastname.toLowerCase();
      const lowercaseValue = value.toLowerCase();
      return lowercaseLastname.includes(lowercaseValue);
    });
    console.log(value);
    console.log(searched);
  };

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
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </Space>
    </>
  );
};

export default Staff;
