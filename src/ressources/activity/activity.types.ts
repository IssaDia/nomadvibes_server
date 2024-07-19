import { activity, activity_activity_type } from '@prisma/client';

/**
 * input type for fetching activities
 */
export type FetchActivitiesInputType = {
  filters?: {
    startDate?: Date;
    location?: string;
    activityType?: activity_activity_type;
    search?: string;
  };
  pagination?: {
    pageSize: number;
    page: number;
  };
  sort?: {
    id: 'asc' | 'desc';
  };
};

/**
 * output type for fetching activities
 */
export type FetchActivitiesReturnType = {
  data: activity[];

  pagination: {
    pageSize: number;
    page: number;
    pageCount: number;
    total: number;
  };
};
