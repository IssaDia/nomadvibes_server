import { FetchActivitiesInputSchemaType } from '../../../api_contract/activity.validator';
import { Request, Response } from 'express';
import ActivityService from './activity.service';

export async function fetchActivity(req: Request, res: Response) {
  try {
    const { filters, sort, pagination } =
      req.query as FetchActivitiesInputSchemaType['query'];
    const activity = await ActivityService.fetchActivities({
      filters,
      sort,
    });
    res
      .status(201)
      .json({ success: true, data: activity, message: 'Activity created' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Error creating activity' });
  }
}
