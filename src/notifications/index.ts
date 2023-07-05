import nodeCron from 'node-cron';
import { scheduleNotifications } from './notifications';

export const runNotifications = async () => {
  console.log('run_notifications => */24 * * * * *');
  nodeCron.schedule("*/10 * * * * *", scheduleNotifications  );

}