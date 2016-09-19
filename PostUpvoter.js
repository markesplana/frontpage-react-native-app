import React from 'react';
import Button from 'react-native-button';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-end'
};

function PostUpvoter({ mutate, postId }) {
  return (
    <Button containerStyle={containerStyle} onPress={() => mutate({ variables: { postId }})}>
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
