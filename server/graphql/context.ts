import { getAuth } from '@clerk/express';
import type { Request, Response } from 'express';

export interface GraphQLContext {
  clerkId: string | null;
}

export async function createContext({ req }: { req: Request; res: Response }): Promise<GraphQLContext> {
  const { userId } = getAuth(req);
  return { clerkId: userId ?? null };
}
