import { api } from '../../index';
import {
  ProjectMutation,
  ProjectSummary,
  ToggleProjectStatus,
} from '../../../types/types.project';
import { projectUrl } from '../../../common/routes';
import { MenuListItems, UpdateFavourite } from '../../../types/types.global';

export const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<void, ProjectMutation>({
      query: (mutation) => ({
        url: projectUrl.create,
        method: 'post',
        body: mutation,
      }),
      invalidatesTags: ['Projects'],
    }),

    getProjectsByTeam: build.query<ProjectSummary[], string>({
      query: (id) => projectUrl.get + '?teamId=' + (id ?? ''),
      providesTags: ['Projects'],
    }),

    getProjectsList: build.query<MenuListItems[], void>({
      query: () => projectUrl.get,
      providesTags: ['Projects'],
    }),

    toggleFavouriteProject: build.mutation<void, UpdateFavourite>({
      query: ({ id }) => ({
        url: projectUrl.toggleFavourite + id,
        method: 'PATCH',
      }),
      invalidatesTags: ['Projects', 'Project'],
    }),

    toggleIsDone: build.mutation<void, ToggleProjectStatus>({
      query: ({ teamId, mutation }) => ({
        url: projectUrl.toggleIsDone + '?teamId=' + teamId,
        method: 'PATCH',
        body: mutation,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsListQuery,
  useGetProjectsByTeamQuery,
  useToggleFavouriteProjectMutation,
  useToggleIsDoneMutation,
} = projectApi;
