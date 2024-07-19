import {
  FetchActivitiesInputType,
  FetchActivitiesReturnType,
} from './activity.types';
import db from '../../utils/db';
import { PAGE_SIZE } from '../../utils/config';
import { activity, activity_type, Prisma } from '@prisma/client';

export default class ActivityService {
  /**
   * Fetches activities based on the given input.
   *
   * @param {FetchActivitiesInputType} input - The input object containing filters, pagination, sorting, and other parameters for fetching activities.
   * @return {FetchActivitiesReturnType} - The result object containing the fetched activities, pagination information, and total count.
   */
  static async fetchActivities(
    input: FetchActivitiesInputType,
  ): Promise<FetchActivitiesReturnType> {
    // configure filters
    let filters: Prisma.activityWhereInput = {};
    const filterParams = input.filters;
    if (filterParams) {
      if (filterParams.startDate) {
        filters = { ...filters, start_date: { gte: filterParams.startDate } };
      }
      if (filterParams.location) {
        filters = { ...filters, location: filterParams.location };
      }
      if (filterParams.search) {
        filters = { ...filters, title: { contains: filterParams.search } };
      }

      if (filterParams.activityType) {
        filters = {
          ...filters,
          activity_type: filterParams.activityType,
        };
      }
    }
    // configure pagination
    const take = input.pagination?.pageSize;
    const skip = input.pagination
      ? input.pagination.pageSize * (input.pagination?.page - 1)
      : 0;

    const results = await db.activity.findMany({
      where: input.filters,
      take,
      skip,
      orderBy: input.sort,
    });
    const totalCount = await db.activity.count({ where: input.filters });
    return {
      data: results,
      pagination: {
        pageSize: input.pagination?.pageSize || PAGE_SIZE,
        page: input.pagination?.page || 1,
        pageCount: results.length,
        total: totalCount,
      },
    };
  }
}
