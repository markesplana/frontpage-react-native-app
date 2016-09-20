import React from 'react';
import { Text, View } from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import PostUpvoter from './PostUpvoter'

const styles = {
  outer: { paddingTop: 32, paddingLeft: 10, paddingRight: 10 },
  wrapper: { height: 40, marginBottom: 15, flex: 1, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { flex: 1, flexDirection: 'row' },
  votes: { color: '#999' },
}

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when it is ready
function PostList({ data: { loading, posts } }) {
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

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList here)
export default graphql(gql`
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
`)(PostList);
