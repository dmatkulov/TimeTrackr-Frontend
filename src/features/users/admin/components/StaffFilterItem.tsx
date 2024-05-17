import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectPositions } from '../../../positions/positionsSlice';
import { getUsers } from '../../UsersThunks';
import { fetchPositions } from '../../../positions/positionsThunks';
import { UserQueryValues } from '../../../../types/types.user';
import { Col, Row, Space, Switch } from 'antd';
import FilterForm from './FilterForm';

interface Props {
  loading: boolean;
}
const StaffFilterItem: React.FC<Props> = ({ loading }) => {
  const dispatch = useAppDispatch();
  const positions = useAppSelector(selectPositions);

  const [isChecked, setIsChecked] = useState(false);

  const fetchOnInitOrReset = useCallback(async () => {
    await dispatch(getUsers());
    await dispatch(fetchPositions());
  }, [dispatch]);

  const fetchAllStaff = useCallback(async () => {
    await dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    void fetchOnInitOrReset();
  }, [fetchOnInitOrReset]);

  const handleFormSubmit = async (state: UserQueryValues) => {
    await dispatch(getUsers(state));
  };

  const onChange = (checked: boolean) => {
    setIsChecked(checked);
    if (!checked) {
      void fetchAllStaff();
    }
  };
  return (
    <Row style={{ marginBottom: 15 }}>
      <Col xs={24} lg={4} style={{ marginBottom: '20px' }}>
        <Space>
          Фильтры
          <Switch size="small" checked={isChecked} onChange={onChange} />
        </Space>
      </Col>
      {isChecked && (
        <Col xs={24} lg={20}>
          <FilterForm
            getAllStaff={fetchAllStaff}
            onSubmit={handleFormSubmit}
            positions={positions}
            loading={loading}
          />
        </Col>
      )}
    </Row>
  );
};

export default StaffFilterItem;
