export const typeDefs = `#graphql
  type Project {
    id: Int!
    userId: Int!
    projectName: String!
    institutionId: Int
    firstName: String!
    lastName: String!
    researchArea: String
    orcid: String
    careerStage: String
    target: String
    createdAt: String
  }

  type Publication {
    id: Int!
    title: String!
    authors: String
    doi: String
    publicationDate: String
    publicationType: String
    publicationYear: String
    journalName: String
    journalIssns: String
    journalOpenalexId: String
    publisherName: String
    publisherCrossrefId: String
    openalexId: String
    pmid: String
    projectId: Int!
    createdAt: String
  }

  type CitationCount {
    id: Int!
    title: String!
    publicationDate: String
    journalName: String
    citationCount: Int!
  }

  type YearlyCount {
    citingYear: Int
    citationCount: Int!
  }

  type MapDataPoint {
    country: String!
    value: Int!
  }

  type CitationJobStatus {
    active: Int!
    wait: Int!
    completed: Int!
    failed: Int!
    total: Int!
  }

  type Query {
    projects: [Project!]!
    projectPublications(projectId: Int!): [Publication!]!
    projectCitationCounts(projectId: Int!): [CitationCount!]!
    projectYearlyCounts(projectId: Int!): [YearlyCount!]!
    citationMap(projectId: Int!): [MapDataPoint!]!
    citationJobStatus(projectId: Int!): CitationJobStatus!
  }
`;
