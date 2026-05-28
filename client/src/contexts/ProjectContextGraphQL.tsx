import { useAuth } from "@clerk/react-router";
import { useQuery } from "@apollo/client";
import { createContext } from "react";
import { gql } from "../__generated__/gql.ts";
import type { ProjectFieldsFragment } from "../__generated__/graphql.js";

// give me the next fields from the type Project I want to name it ProjectFields
export const PROJECT_FIELDS_FRAGMENT = gql(`
  fragment ProjectFields on Project {
    id
    userId
    projectName
    institutionId
    firstName
    lastName
    researchArea
    orcid
    careerStage
    target
    createdAt
  }
`);

const GET_PROJECTS = gql(`
  query GetProjects {
    projects {
      ...ProjectFields
    }
  }
`);


interface ProjectGraphQLContextValue {
  projects: ProjectFieldsFragment[];
  loading: boolean;
  error: string;
}

export const ProjectGraphQLContext =
  createContext<ProjectGraphQLContextValue | null>(null);

export const ProjectGraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isSignedIn, isLoaded } = useAuth();

  const { data, loading, error } = useQuery(GET_PROJECTS, {
    skip: !isLoaded || !isSignedIn,
  });

  const value: ProjectGraphQLContextValue = {
    projects: data?.projects ?? [],
    loading,
    error: error?.message ?? "",
  };

  return (
    <ProjectGraphQLContext.Provider value={value}>
      {children}
    </ProjectGraphQLContext.Provider>
  );
};
