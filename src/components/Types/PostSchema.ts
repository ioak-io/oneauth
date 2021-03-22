import gql from 'graphql-tag';

export const LIST_POSTS = gql`
  query Posts($pageNo: Int, $pageSize: Int) {
    posts(pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        title
        description
        views
        followers
        comments
        helpful
        notHelpful
        isAnswered
        answeredOn
        createdAt
        updatedAt
        tags {
          id
          name
        }
      }
      pageNo
      hasMore
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($text: String, $pageNo: Int, $pageSize: Int) {
    searchPosts(text: $text, pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        title
        description
        views
        followers
        comments
        helpful
        notHelpful
        isAnswered
        answeredOn
        createdAt
        updatedAt
        tags {
          id
          name
        }
      }
      pageNo
      hasMore
      total
    }
  }
`;

export const MY_POSTS = gql`
  query MyPosts($pageNo: Int, $pageSize: Int) {
    myPosts(pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        title
        description
        views
        followers
        comments
        helpful
        notHelpful
        isAnswered
        answeredOn
        createdAt
        updatedAt
        tags {
          id
          name
        }
      }
      pageNo
      hasMore
      total
    }
  }
`;

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      title
      description
      views
      followers
      comments
      helpful
      notHelpful
      isAnswered
      answeredOn
      createdAt
      updatedAt
      followerList {
        id
        userId
      }
      tags {
        id
        name
      }
      feedback {
        type
      }
    }
  }
`;

export const POSTS_BY_TAG = gql`
  query PostsByTag($tag: String!, $pageNo: Int, $pageSize: Int) {
    postsByTag(tag: $tag, pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        name
        post {
          id
          title
          description
          views
          followers
          comments
          helpful
          notHelpful
          isAnswered
          answeredOn
          createdAt
          updatedAt
          tags {
            id
            name
          }
        }
      }
      pageNo
      hasMore
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($payload: PostPayload!) {
    addPost(payload: $payload) {
      id
      title
      description
      views
      followers
      comments
      helpful
      notHelpful
      isAnswered
      answeredOn
      createdAt
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const ADD_POST_FEEDBACK = gql`
  mutation AddPostFeedback($postId: String!, $type: String!) {
    addPostFeedback(postId: $postId, type: $type) {
      id
      post {
        id
        helpful
        notHelpful
        feedback {
          type
        }
      }
    }
  }
`;

export const REMOVE_POST_FEEDBACK = gql`
  mutation RemovePostFeedback($postId: String!, $type: String!) {
    removePostFeedback(postId: $postId, type: $type) {
      id
      post {
        id
        helpful
        notHelpful
        feedback {
          type
        }
      }
    }
  }
`;

export const POST_TAG_CLOUD = gql`
  query PostTagCloud {
    postTagCloud {
      name
      count
    }
  }
`;

export const POST_COMMENTS = gql`
  query PostComments($postId: String!, $pageNo: Int, $pageSize: Int) {
    postComments(postId: $postId, pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        text
        parentId
        helpful
        notHelpful
        isAnswer
        createdBy
        updatedBy
        createdAt
        updatedAt
        feedback {
          type
        }
      }
      pageNo
      hasMore
    }
  }
`;

export const POST_COMMENT = gql`
  query PostComment($id: ID!) {
    postComment(id: $id) {
      id
      text
      parentId
      helpful
      notHelpful
      isAnswer
      createdBy
      updatedBy
      createdAt
      updatedAt
      feedback {
        type
      }
    }
  }
`;

export const UPDATE_POST_COMMENT = gql`
  mutation UpdatePostComment($payload: PostCommentPayload!) {
    updatePostComment(payload: $payload) {
      id
      text
      parentId
      helpful
      notHelpful
      isAnswer
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
`;

export const ADD_POST_COMMENT_FEEDBACK = gql`
  mutation AddPostCommentFeedback($commentId: String!, $type: String!) {
    addPostCommentFeedback(commentId: $commentId, type: $type) {
      id
      postComment {
        id
        helpful
        notHelpful
        feedback {
          type
        }
      }
    }
  }
`;

export const REMOVE_POST_COMMENT_FEEDBACK = gql`
  mutation RemovePostCommentFeedback($commentId: String!, $type: String!) {
    removePostCommentFeedback(commentId: $commentId, type: $type) {
      id
      postComment {
        id
        helpful
        notHelpful
        feedback {
          type
        }
      }
    }
  }
`;

export const FOLLOW_POST = gql`
  mutation FollowPost($postId: String!) {
    followPost(postId: $postId) {
      id
      post {
        id
        followers
        followerList {
          id
          userId
        }
      }
    }
  }
`;

export const UNFOLLOW_POST = gql`
  mutation UnfollowPost($postId: String!) {
    unfollowPost(postId: $postId) {
      id
      userId
      post {
        id
        followers
        followerList {
          id
          userId
        }
      }
    }
  }
`;

export const MARK_POSTCOMMENT_AS_ANSWER = gql`
  mutation MarkPostCommentAsAnswer($id: ID!) {
    markPostCommentAsAnswer(id: $id) {
      id
      isAnswer
      post {
        id
        isAnswered
        answeredOn
      }
    }
  }
`;

export const UNMARK_POSTCOMMENT_AS_ANSWER = gql`
  mutation UnmarkPostCommentAsAnswer($id: ID!) {
    unmarkPostCommentAsAnswer(id: $id) {
      id
      isAnswer
      post {
        id
        isAnswered
        answeredOn
      }
    }
  }
`;
