/* eslint-disable no-magic-numbers */
/**
 * Enum for common HTTP status codes used throughout the application.
 * Values correspond to standard HTTP response codes.
 */
export enum HttpStatusCodes {
  Ok = 200,
  Created,
  Accepted,
  NoContent = 204,
  MovedPermanently = 301,
  Redirect,
  BadRequest = 400,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
  RequestTimeout = 408,
  ImaTeapot = 418,
  InternalServerError = 500,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
}
