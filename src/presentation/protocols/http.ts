export enum HttpStatusCode {
  OK = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpRequest = {
  body?: any;
};

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body: any;
};

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error,
});

export const serverError = (error?: Error): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  body: error,
});

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data,
});
