import { api } from '../../index';
import { GlobalMessage } from '../../../types/types.global';
import { TeamMutation } from '../../../types/types.team';
import { teamUrl } from '../../../common/routes';

export const teamApi = api.injectEndpoints({
  endpoints: (build) => ({
    createTeam: build.mutation<GlobalMessage, TeamMutation>({
      query: (body) => ({
        url: teamUrl.create,
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useCreateTeamMutation } = teamApi;

export default teamApi;
