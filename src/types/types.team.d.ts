import { UserSummary } from './types.user';
import { Position } from './types.position';

export interface Team {
  _id: string;
  name: string;
  isFavorite: boolean;
  members: TeamMember[];
}

export interface TeamList {
  _id: string;
  name: string;
  isFavorite: boolean;
}

export interface TeamMember {
  _id: string;
  user: UserSummary;
  position: Position;
}

export interface TeamMutation {
  name: string;
  description: string;
  members: TeamMemberMutation[];
}

export interface TeamMemberMutation {
  user: string;
  position: string;
}

export interface UpdateTeamFav {
  id: string;
  isFavorite: boolean;
}
