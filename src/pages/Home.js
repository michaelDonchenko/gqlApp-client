import React, { useContext } from 'react'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { Button } from '@material-ui/core'
import { AuthContext } from '../context/authContext'

const GET_ALL_POSTS = gql`
  query {
    allPosts {
      title
      description
    }
  }
`

const Home = () => {
  const [
    fetchPosts,
    { error: allPostsError, loading: allPostsLoading, data: allPostsData },
  ] = useLazyQuery(GET_ALL_POSTS)

  if (allPostsData) console.log(allPostsData.allPosts)

  const { state, dispatch } = useContext(AuthContext)

  const changeUser = () => {
    dispatch({
      type: 'LOGGEN_IN_USER',
      payload: 'Updated user name',
    })
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={fetchPosts}>
        Fetch Posts
      </Button>
      <Button variant='contained' color='primary' onClick={changeUser}>
        Change user name
      </Button>
    </div>
  )
}

export default Home
