import { gql } from '@apollo/client'
import { USER_INFO } from './fragments'

export const USER_CREATE_OR_UPDATE = gql`
  mutation {
    userCreateOrUpdate {
      username
      email
    }
  }
`

export const UPDATE_USER_DETAILS = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`
