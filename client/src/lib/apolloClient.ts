import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function createApolloClient(getToken: () => Promise<string | null>) {
  const authLink = setContext(async (_, { headers }: { headers?: Record<string, string> }) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(new HttpLink({ uri: `${API_BASE_URL}/graphql` })),
    cache: new InMemoryCache(),
  });
}
