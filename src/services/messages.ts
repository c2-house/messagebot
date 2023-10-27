import { PromptParams } from '@/types/message';

export const generateStream = async (params: PromptParams) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...params, maxLength: 200 }),
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.body;
};
