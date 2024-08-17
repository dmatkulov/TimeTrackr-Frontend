export interface TeamMutation {
  name: string;
  description: string;
  members: TeamMemberMutation[];
}

export interface TeamMemberMutation {
  user: string;
  position: string;
}
