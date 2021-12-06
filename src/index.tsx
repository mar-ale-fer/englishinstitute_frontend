import { render } from 'react-dom'
import './index.css';
import App from './components/App';
import { ApolloClient, createHttpLink, NormalizedCacheObject,ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';

const graphqluri = process.env.REACT_APP_GRAPHQL_URI;

const httpLink = createHttpLink({
  uri: graphqluri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
,
  document.getElementById('root')
);
