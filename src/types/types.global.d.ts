export interface GlobalMessage {
  message: string;
}

export interface BadRequestError {
  error: string;
  message: string;
  status: number;
}

export interface ValidationError {
  message: {
    property: string;
    message: string;
  }[];
  error: string;
  statusCode: number;
}
