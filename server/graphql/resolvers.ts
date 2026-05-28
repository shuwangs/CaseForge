import { GraphQLError } from 'graphql';
import { citationsQueue } from '../queues/citation.queue.js';
import { getCitationCountsByYear, getCitationMapData, getCitationsCountByProjectId } from '../services/citation.service.js';
import { getProjectsByClerkId } from '../services/project.service.js';
import { getPublicationsByProjectId } from '../services/publication.service.js';
import { mapPublicationDTO } from '../utitls/publication.helper.js';
import type { GraphQLContext } from './context.ts';

function requireAuth(clerkId: string | null): string {
  if (!clerkId) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHENTICATED' } });
  }
  return clerkId;
}

export const resolvers = {
  Query: {
    projects: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      const clerkId = requireAuth(ctx.clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = await getProjectsByClerkId(clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rows.map((r: any) => ({
        id: r.id,
        userId: r.user_id,
        projectName: r.project_name,
        institutionId: r.institution_id ?? null,
        firstName: r.first_name,
        lastName: r.last_name,
        researchArea: r.research_area ?? null,
        orcid: r.orcid ?? null,
        careerStage: r.career_stage ?? null,
        target: r.target ?? null,
        createdAt: r.created_at ? String(r.created_at) : null,
      }));
    },

    projectPublications: async (_: unknown, { projectId }: { projectId: number }, ctx: GraphQLContext) => {
      const clerkId = requireAuth(ctx.clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = await getPublicationsByProjectId(clerkId, String(projectId));
      return rows.map(mapPublicationDTO);
    },

    projectCitationCounts: async (_: unknown, { projectId }: { projectId: number }, ctx: GraphQLContext) => {
      const clerkId = requireAuth(ctx.clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = await getCitationsCountByProjectId(String(projectId), clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rows.map((r: any) => ({
        id: r.id,
        title: r.title,
        publicationDate: r.publication_date ? String(r.publication_date) : null,
        journalName: r.journal_name ?? null,
        citationCount: Number(r.citation_count),
      }));
    },

    projectYearlyCounts: async (_: unknown, { projectId }: { projectId: number }, ctx: GraphQLContext) => {
      const clerkId = requireAuth(ctx.clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: any[] = await getCitationCountsByYear(String(projectId), clerkId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rows.map((r: any) => ({
        citingYear: r.citing_year ?? null,
        citationCount: Number(r.citation_count),
      }));
    },

    citationMap: async (_: unknown, { projectId }: { projectId: number }, ctx: GraphQLContext) => {
      const clerkId = requireAuth(ctx.clerkId);
      return getCitationMapData(String(projectId), clerkId);
    },

    citationJobStatus: async (_: unknown, { projectId }: { projectId: number }, ctx: GraphQLContext) => {
      const clerkId = requireAuth(ctx.clerkId);
      const projectIdStr = String(projectId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jobs: any[] = await citationsQueue.getJobs(['active', 'wait', 'completed', 'failed']);
      const projectJobs = jobs.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (job: any) => job.data.projectId === projectIdStr && job.data.clerkId === clerkId,
      );

      const status = { active: 0, wait: 0, completed: 0, failed: 0, total: projectJobs.length };
      for (const job of projectJobs) {
        const state: string = await job.getState();
        if (state in status) {
          (status as Record<string, number>)[state]++;
        }
      }

      return status;
    },
  },
};
