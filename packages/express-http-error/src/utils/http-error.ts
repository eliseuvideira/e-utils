export type HttpErrorProps = {
  status: number;
  message: string;
  properties?: Record<string, unknown>;
  cause?: unknown;
};

export class HttpError extends Error {
  public status: number;
  public properties: Record<string, unknown>;
  public cause: unknown;

  constructor({ message, status, properties = {}, cause }: HttpErrorProps) {
    super(message);
    this.status = status;
    this.properties = properties;
    this.cause = cause;
  }

  public toJSON(): Record<string, unknown> {
    return {
      message: this.message,
      status: this.status,
      properties: this.properties,
      stack: this.stack,
      cause: this.cause,
    };
  }
}
