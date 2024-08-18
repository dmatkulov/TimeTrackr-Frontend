import { api } from '../../index';
import { GlobalMessage } from '../../../types/types.global';
import {
  TeamList,
  TeamMutation,
  UpdateTeamFav,
} from '../../../types/types.team';
import { teamUrl } from '../../../common/routes';

export const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<TeamList[], void>({
      query: () => teamUrl.get,
      providesTags: ['Teams'],
    }),

    createTeam: build.mutation<GlobalMessage, TeamMutation>({
      query: (body) => ({
        url: teamUrl.create,
        method: 'post',
        body,
      }),
      invalidatesTags: ['Teams'],
    }),

    toggleFavourite: build.mutation<void, UpdateTeamFav>({
      query: ({ id, isFavorite }) => ({
        url: teamUrl.toggle + id,
        method: 'PATCH',
        body: { isFavorite },
      }),
      invalidatesTags: ['Teams'],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useToggleFavouriteMutation,
} = teamApi;
