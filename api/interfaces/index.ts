export interface IServerResponse {
  message: string;
  path: string;
  statusCode: number;
  success: boolean;
  timestamp: string;
  data?: any;
}
