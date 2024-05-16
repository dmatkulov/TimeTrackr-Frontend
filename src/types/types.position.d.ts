export interface Position {
  _id: string;
  name: string;
}

export interface PositionMutation {
  name: string;
}

export interface UpdatePositionArg {
  id: string;
  mutation: PositionMutation;
}
