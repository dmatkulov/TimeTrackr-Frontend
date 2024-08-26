import { UserSummary } from './types.user';

export interface Team {
  _id: string;
  name: string;
  isFavorite: boolean;
  members: UserSummary[];
}

export interface TeamMutation {
  name: string;
  description: string;
  members: string[];
}

export interface UpdateTeamFav {
  id: string;
}

export interface UpdateTeamMutation {
  id: string;
  mutation: {
    name?: string;
    description?: string;
    members?: string[];
  };
}
