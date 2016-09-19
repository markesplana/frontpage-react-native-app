import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import PostUpvoter from './PostUpvoter'

const styles = {
  outer: { paddingTop: 22 },
  wrapper: { height: 45, flex: 1, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { flex: 1, flexDirection: 'row' },
  votes: { color: '#999' },
}

function PostList({ loading, posts }) {
  if (loading) {
    return <Text style={styles.outer}>Loading</Text>;
  } else {
    return (
      <View style={styles.outer}>
        {posts.sort((x, y) => y.votes - x.votes).map(post => (
          <View key={post.id} style={styles.wrapper}>
            <View>
              <Text style={styles.header}>{post.title}</Text>
              <View style={styles.subtextWrapper}>
                <Text>by {post.author.firstName} {post.author.lastName} </Text>
                <Text style={styles.votes}>{post.votes} votes</Text>
              </View>
            </View>
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
