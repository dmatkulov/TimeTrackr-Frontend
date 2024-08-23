import { api } from '../../index';
import { GlobalMessage } from '../../../types/types.global';
import { Team, TeamMutation, UpdateTeamFav } from '../../../types/types.team';
import { teamUrl } from '../../../common/routes';

export const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<Team[], void>({
      query: () => teamUrl.get,
      providesTags: ['Teams'],
    }),

    getTeamsByUser: build.query<Team[], string>({
      query: (id) => teamUrl.get + '?user-teams=' + (id ?? ''),
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
      query: ({ id }) => ({
        url: teamUrl.toggle + id,
        method: 'PATCH',
      }),
      invalidatesTags: ['Teams', 'Team'],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamsByUserQuery,
  useCreateTeamMutation,
  useGetSelectedTeamQuery,
  useToggleFavouriteMutation,
} = teamApi;
