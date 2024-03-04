import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { initBroker } from './messageBroker';


export default {
  name: '{name}',
  graphql: async () => {
    return {
      typeDefs: await typeDefs(),
      resolvers: await resolvers()
    };
  },

  apolloServerContext: async (context) => {
    return context;
  },

  onServerInit: async options => {
    

    initBroker();
  }
};
