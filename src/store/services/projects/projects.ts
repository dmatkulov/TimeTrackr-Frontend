import { api } from '../../index';
import { ProjectMutation } from '../../../types/types.project';
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
    }),

    getProjectsList: build.query<MenuListItems[], void>({
      query: () => projectUrl.get,
      providesTags: ['Projects'],
    }),
  }),
});

export const { useGetProjectsListQuery } = projectApi;
