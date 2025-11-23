export enum NotificationType {
    Error = 'error',
    Action = 'action',
}

export interface UINotification {
    message: string;
    type: NotificationType;
}
