export interface GlobalMessage {
  message: string;
}

export interface GlobalError {
  status: number;
  data: {
    message: string;
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
