import { api } from '../../index';
import { Position } from '../../../types/types.position';
import { positionRoute } from '../../../utils/routes.service';

const positionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<Position[], void>({
      query: () => positionRoute.positions,
      providesTags: ['Position'],
    }),
  }),
});

export const { useGetPositionsQuery } = positionApi;
