export interface GlobalMessage {
  message: string;
}

export interface BadRequestError {
  code: string;
  status: number;
  data: {
    error: string;
    message: string;
    status: number;
  };
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}
