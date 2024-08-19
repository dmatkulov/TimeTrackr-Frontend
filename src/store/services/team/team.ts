import { api } from '../../index';
import { GlobalMessage } from '../../../types/types.global';
import {
  Team,
  TeamList,
  TeamMutation,
  UpdateTeamFav,
} from '../../../types/types.team';
import { teamUrl } from '../../../common/routes';

export const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeamsList: build.query<TeamList[], string>({
      query: (id) => teamUrl.get + '?teamList=' + (id ?? ''),
      providesTags: ['Teams'],
    }),

    getSelectedTeam: build.query<Team, string>({
      query: (id) => teamUrl.get + '/' + id,
      providesTags: ['Team'],
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
      invalidatesTags: ['Teams', 'Team'],
    }),
  }),
});

export const {
  useGetTeamsListQuery,
  useCreateTeamMutation,
  useGetSelectedTeamQuery,
  useToggleFavouriteMutation,
} = teamApi;
