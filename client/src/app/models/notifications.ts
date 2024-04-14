export class Notifications {
    constructor(
        public id: number,
        public type: NotificationsType,
        public title: string,
        public message: string,
        public timeout: number,
    ) {}
}

export enum NotificationsType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}