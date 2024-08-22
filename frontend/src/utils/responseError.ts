interface ResponseErrorProps {
  detail: string;
  status: number;
  code: string;
  title: string;
}

export class ResponseError extends Error {
  code;
  status;

  constructor({ detail, code, title, status }: ResponseErrorProps) {
    super();
    this.message = detail;
    this.code = code;
    this.name = title;
    this.status = status;
  }
}
