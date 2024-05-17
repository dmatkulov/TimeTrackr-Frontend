export interface Position {
  _id: string;
  name: string;
  tag: string;
}

export interface PositionMutation {
  name: string;
  tag: string;
}

export interface UpdatePositionArg {
  id: string;
  mutation: PositionMutation;
}
