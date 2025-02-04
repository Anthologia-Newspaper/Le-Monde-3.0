export type DailyStats = {
    date: string;
    count: number;
    toDate: number;
};

export type Stats = {
    likeCounter: number;
    viewCounter: number;
    dailyLikes: DailyStats[];
    dailyViews: DailyStats[];
};

