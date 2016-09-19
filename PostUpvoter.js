import React from 'react';
import Button from 'react-native-button';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-end'
};

// A mutation is made available on a callback called `mutate`
// Other props of the wrapping component are passed through.
function PostUpvoter({ mutate, postId }) {
  return (
    <Button containerStyle={containerStyle} onPress={() => mutate({ variables: { postId }})}>
      Upvote
    </Button>
  )
}

// You can also use `graphql` for GraphQL mutations
export default graphql(gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`)(PostUpvoter);
