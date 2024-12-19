// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Pad from '@/models/pad';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown[]>
) {
  try {
    const pad = new Pad();
    const { path } = req.query;
    const result = pad.find(path);
    return res.status(200).json([result]);
  } catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).json(error);
  }
}
