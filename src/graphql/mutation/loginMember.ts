import { gql } from '@apollo/client';

export const LOGIN_MEMBER = gql`
  mutation LoginMember($data: MemberAuthInput!) {
    loginMember(data: $data) {
      ... on MemberSuccessfulAuthentication {
        authToken
      }
    }
  }
`;
