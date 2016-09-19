import React from 'react';
import Button from 'react-native-button';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

function PostUpvoter({ mutate, postId }) {
  return (
    <Button onPress={() => mutate({ variables: { postId }})}>
      Upvote
    </Button>
  )
}
export default graphql(gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`)(PostUpvoter);
