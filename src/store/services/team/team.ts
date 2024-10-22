import { api } from '../../index';
import {
  GlobalMessage,
  MenuListItems,
  UpdateFavourite,
} from '../../../types/types.global';
import {
  Team,
  TeamMutation,
  UpdateTeamMutation,
} from '../../../types/types.team';
import { teamUrl } from '../../../common/routes';

export const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeams: build.query<Team[], void>({
      query: () => teamUrl.get,
      providesTags: ['Teams'],
    }),

    getTeamsList: build.query<MenuListItems[], void>({
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

    deleteMembers: build.mutation<GlobalMessage, UpdateTeamMutation>({
      query: ({ id, mutation }) => ({
        url: teamUrl.deleteMember + id,
        method: 'delete',
        body: { members: mutation.members },
        invalidatesTags: ['Teams', 'Team'],
      }),
    }),

    updateTeam: build.mutation<GlobalMessage, UpdateTeamMutation>({
      query: ({ id, mutation }) => ({
        url: teamUrl.update + id,
        method: 'PATCH',
        body: mutation,
        headers: {
          'Content-Type': 'application/json',
        },
        invalidatesTags: ['Teams', 'Team'],
      }),
    }),

    deleteTeam: build.mutation<void, string>({
      query: (id) => ({
        url: teamUrl.deleteTeam + id,
        method: 'delete',
      }),
    }),

    toggleFavouriteTeam: build.mutation<void, UpdateFavourite>({
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
  useGetTeamsListQuery,
  useCreateTeamMutation,
  useGetSelectedTeamQuery,
  useDeleteMembersMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useToggleFavouriteTeamMutation,
} = teamApi;
