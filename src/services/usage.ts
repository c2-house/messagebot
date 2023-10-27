import { headers } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { Database, Usage } from '@/types/supabase';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const MAX_REQUEST_COUNT = 30;

const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

const getIP = () => {
  const headerList = headers();
  const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  return ip;
};

interface UsageCheck {
  data: Usage[];
  type: 'create' | 'update';
}

const checkUsageRestriction = async (ip: string): Promise<UsageCheck> => {
  const { data } = await supabase
    .from('usage_restriction')
    .select('*')
    .eq('identifier', ip)
    .order('created_at', { ascending: false });

  const today = dayjs().tz('Asia/Seoul').format('YYYY-MM-DD');

  if (data && data.length > 0) {
    const createdAt = dayjs(data[0].created_at).format('YYYY-MM-DD');
    if (createdAt === today) {
      if (data[0].count >= MAX_REQUEST_COUNT) {
        throw new Error('Request limit exceeded.');
      }
      return { data, type: 'update' };
    }
    return { data, type: 'create' };
  }

  return { data: data || [], type: 'create' };
};

export const updateCount = async () => {
  const ip = getIP();
  const { data, type } = await checkUsageRestriction(ip);

  if (type === 'create') {
    await supabase.from('usage_restriction').insert([
      {
        identifier: ip,
        count: 1,
        created_at: dayjs().tz('Asia/Seoul').format(),
      },
    ]);
  } else if (type === 'update') {
    const { count, id } = data[0];
    await supabase
      .from('usage_restriction')
      .update({ count: count + 1 })
      .eq('id', id);
  }
};
