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
