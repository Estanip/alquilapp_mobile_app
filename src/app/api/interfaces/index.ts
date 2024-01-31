export interface ServerResponse {
    message: string;
    path: string;
    statusCode: number;
    success: boolean;
    timestamp: string;
    data: object | null;
}
