import { api } from '../../index';
import { ProjectMutation, ProjectSummary } from '../../../types/types.project';
import { projectUrl } from '../../../common/routes';
import { MenuListItems } from '../../../types/types.global';

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
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsListQuery,
  useGetProjectsByTeamQuery,
} = projectApi;
