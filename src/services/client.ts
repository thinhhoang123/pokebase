import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.BASE_API_URL!, {
  headers: {
    'content-type': 'application/json',
    accept: '*/*',
  },
});

export default client;
