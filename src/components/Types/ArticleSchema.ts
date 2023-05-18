import gql from 'graphql-tag';

export const LIST_ARTICLES = gql`
  query Articles($categoryId: ID!, $pageNo: Int, $pageSize: Int) {
    articles(categoryId: $categoryId, pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        title
        description
        views
        comments
        isAnswered
        answeredOn
        helpful
        notHelpful
        createdAt
        updatedAt
        tags {
          id
          name
        }
        category {
          id
          name
        }
      }
      pageNo
      hasMore
    }
  }
`;

export const SEARCH_ARTICLES = gql`
  query SearchArticles($text: String, $pageNo: Int, $pageSize: Int) {
    searchArticles(text: $text, pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        title
        description
        views
        comments
        isAnswered
        answeredOn
        helpful
        notHelpful
        createdAt
        updatedAt
        tags {
          id
          name
        }
        category {
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

export const GET_ARTICLES = gql`
  query GetArticles(
    $text: String
    $categoryId: String
    $pageNo: Int
    $pageSize: Int
  ) {
    getArticles(
      text: $text
      categoryId: $categoryId
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
      results {
        id
        title
        description
        views
        comments
        isAnswered
        answeredOn
        helpful
        notHelpful
        createdAt
        updatedAt
        tags {
          id
          name
        }
        category {
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

export const GET_ARTICLE = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      description
      views
      comments
      isAnswered
      answeredOn
      helpful
      notHelpful
      createdAt
      updatedAt
      tags {
        id
        name
      }
      category {
        id
        name
      }
      feedback {
        type
      }
    }
  }
`;

export const ARTICLES_BY_TAG = gql`
  query ArticlesByTag($tag: String!, $pageNo: Int, $pageSize: Int) {
    articlesByTag(tag: $tag, pageNo: $pageNo, pageSize: $pageSize) {
      results {
        id
        name
        article {
          id
          title
          description
          views
          comments
          isAnswered
          answeredOn
          helpful
          notHelpful
          createdAt
          updatedAt
          tags {
            id
            name
          }
          category {
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

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($payload: ArticlePayload!) {
    addArticle(payload: $payload) {
      id
      title
      description
      views
      comments
      isAnswered
      answeredOn
      helpful
      notHelpful
      createdAt
      updatedAt
      tags {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

export const LIST_ARTICLE_CATEGORIES = gql`
  query ArticleCategories {
    articleCategories {
      id
      name
      articles
    }
  }
`;

export const UPDATE_ARTICLE_CATEGORY = gql`
  mutation UpdateArticleCategory($payload: ArticleCategoryPayload!) {
    addArticleCategory(payload: $payload) {
      id
      name
      articles
    }
  }
`;

export const ADD_ARTICLE_FEEDBACK = gql`
  mutation AddArticleFeedback($articleId: String!, $type: String!) {
    addArticleFeedback(articleId: $articleId, type: $type) {
      id
      article {
        id
        title
        description
        views
        comments
        isAnswered
        answeredOn
        helpful
        notHelpful
        createdAt
        updatedAt
        tags {
          id
          name
        }
        category {
          id
        }
        feedback {
          type
        }
      }
    }
  }
`;

export const REMOVE_ARTICLE_FEEDBACK = gql`
  mutation RemoveArticleFeedback($articleId: String!, $type: String!) {
    removeArticleFeedback(articleId: $articleId, type: $type) {
      id
      article {
        id
        title
        description
        views
        comments
        isAnswered
        answeredOn
        helpful
        notHelpful
        createdAt
        updatedAt
        tags {
          id
          name
        }
        category {
          id
        }
        feedback {
          type
        }
      }
    }
  }
`;

export const ARTICLE_TAG_CLOUD = gql`
  query ArticleTagCloud {
    articleTagCloud {
      name
      count
    }
  }
`;

export const ARTICLE_COMMENTS = gql`
  query ArticleComments($articleId: String!, $pageNo: Int, $pageSize: Int) {
    articleComments(
      articleId: $articleId
      pageNo: $pageNo
      pageSize: $pageSize
    ) {
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

export const ARTICLE_COMMENT = gql`
  query ArticleComment($id: ID!) {
    articleComment(id: $id) {
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

export const UPDATE_ARTICLE_COMMENT = gql`
  mutation UpdateArticleComment($payload: ArticleCommentPayload!) {
    updateArticleComment(payload: $payload) {
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

export const ADD_ARTICLE_COMMENT_FEEDBACK = gql`
  mutation AddArticleCommentFeedback($commentId: String!, $type: String!) {
    addArticleCommentFeedback(commentId: $commentId, type: $type) {
      id
      articleComment {
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

export const REMOVE_ARTICLE_COMMENT_FEEDBACK = gql`
  mutation RemoveArticleCommentFeedback($commentId: String!, $type: String!) {
    removeArticleCommentFeedback(commentId: $commentId, type: $type) {
      id
      articleComment {
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

export const MARK_ARTICLECOMMENT_AS_ANSWER = gql`
  mutation MarkArticleCommentAsAnswer($id: ID!) {
    markArticleCommentAsAnswer(id: $id) {
      id
      isAnswer
      article {
        id
        isAnswered
        answeredOn
      }
    }
  }
`;

export const UNMARK_ARTICLECOMMENT_AS_ANSWER = gql`
  mutation UnmarkArticleCommentAsAnswer($id: ID!) {
    unmarkArticleCommentAsAnswer(id: $id) {
      id
      isAnswer
      article {
        id
        isAnswered
        answeredOn
      }
    }
  }
`;
