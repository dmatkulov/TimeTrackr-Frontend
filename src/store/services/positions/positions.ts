import { api } from '../../index';
import { Position } from '../../../types/types.position';
import { positionUrl } from '../../../common/routes';

const positionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<Position[], void>({
      query: () => positionUrl.get,
      providesTags: ['Position'],
    }),
  }),
});

export const { useGetPositionsQuery } = positionApi;
