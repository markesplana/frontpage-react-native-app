import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import PostUpvoter from './PostUpvoter'

function PostList({ loading, posts }) {
  if (loading) {
    return <Text>Loading</Text>;
  } else {
    return (
      <View>
        {posts.sort((x, y) => y.votes - x.votes).map(post => (
          <View key={post.id}>
            <Text>
              {post.title} by {' '}
              {post.author.firstName} {post.author.lastName} {' '}
              <Text>{post.votes} votes</Text>
            </Text>
            <PostUpvoter postId={post.id} />
          </View>
        ))}
      </View>
    );
  }
}

const allPosts = gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
`

export default graphql(allPosts, {
  props: ({data: { loading, posts }}) => ({
    loading,
    posts,
  }),
})(PostList);
