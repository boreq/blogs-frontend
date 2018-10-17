export class Blog {
    id: number;
    title: string;
    subscriptions: number;
    lastPost: Date;
    url: string;
    cleanUrl: string;
    subscribed?: boolean;
}
