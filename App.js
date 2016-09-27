import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { Client } from 'subscriptions-transport-ws';

import { print } from 'graphql-tag/printer';

// quick way to add the subscribe and unsubscribe functions to the network interface
function addGraphQLSubscriptions(networkInterface, wsClient) {
  return Object.assign(networkInterface, {
    subscribe(request, handler) {
      return wsClient.subscribe({
        query: print(request.query),
        variables: request.variables,
      }, handler);
    },
    unsubscribe(id: number) {
      wsClient.unsubscribe(id);
    },
  });
}


import PostList from './PostList';

export default class extends Component {
  constructor(...args) {
    super(...args);

    const networkInterface = createNetworkInterface('http://localhost:8080/graphql');
    const wsClient = new Client('ws://localhost:8090');
    const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      wsClient,
    );
    this.client = new ApolloClient({
      networkInterface: networkInterfaceWithSubscriptions,
      dataIdFromObject: r => r.id,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <PostList />
      </ApolloProvider>
    );
  }
}
