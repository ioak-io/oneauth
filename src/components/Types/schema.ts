import gql from 'graphql-tag';

export const authorizeUserQuery = gql`
  query authorizeUser(
    $accessToken: String
    $refreshToken: String
    $space: String
  ) {
    authorizeUser(
      accessToken: $accessToken
      refreshToken: $refreshToken
      space: $space
    ) {
      accessToken
      claims
    }
  }
`;

export const GET_SESSION = gql`
  query Session($key: ID!, $asset: String) {
    session(key: $key, asset: $asset) {
      id
      firstName
      lastName
      email
      token
    }
  }
`;

export const NEW_EMAIL_SESSION = gql`
  query NewEmailSession($email: String!) {
    newEmailSession(email: $email) {
      sessionId
    }
  }
`;

export const NEW_EXTERN_SESSION = gql`
  query NewExternSession($token: String!, $asset: String) {
    newExternSession(token: $token, asset: $asset) {
      sessionId
    }
  }
`;

export const CREATE_EMAIL_ACCOUNT = gql`
  mutation CreateEmailAccount($payload: UserPayload) {
    createEmailAccount(payload: $payload) {
      id
      email
    }
  }
`;

export const LIST_ASSETS = gql`
  query Assets {
    assets {
      id
      name
      section
      featuredTitle
      featuredSubtitle
      hero
      jwtPassword
      productionMode
      assetId
    }
  }
`;

export const GET_ASSET = gql`
  query Asset($assetId: String!) {
    asset(assetId: $assetId) {
      id
      name
      section
      featuredTitle
      featuredSubtitle
      hero
      jwtPassword
      productionMode
      assetId
    }
  }
`;

export const CREATE_ASSET = gql`
  mutation CreateAsset(
    $payload: AssetPayload!
    $addition: AssetAdditionPayload!
  ) {
    createAsset(payload: $payload, addition: $addition) {
      id
      name
      section
      featuredTitle
      featuredSubtitle
      hero
      jwtPassword
      productionMode
      assetId
    }
  }
`;

export const UPDATE_ASSET = gql`
  mutation UpdateAsset($payload: AssetPayload!) {
    updateAsset(payload: $payload) {
      id
      name
      section
      featuredTitle
      featuredSubtitle
      hero
      jwtPassword
      productionMode
      assetId
    }
  }
`;

export const USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
    }
  }
`;
