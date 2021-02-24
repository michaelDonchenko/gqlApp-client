import { gql } from '@apollo/client'
import { USER_INFO } from './fragments'

export const USER_DETAILS = gql`
  query {
    userDetails {
      ...userInfo
    }
  }
  ${USER_INFO}
`

export const PUBLIC_PROFILE = gql`
  query publicProfile($email: String!) {
    publicProfile(email: $email) {
      ...userInfo
    }
  }
  ${USER_INFO}
`

export const GET_ALL_POSTS = gql`
  query {
    allPosts {
      title
      description
    }
  }
`

export const ALL_USERS = gql`
  query {
    allUsers {
      email
      username
      images {
        url
      }
    }
  }
`
