import React, { useState, useMemo, useContext } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import Spinner from '../../components/Spinner'
import Alerts from '../../components/Alerts'
import { auth } from '../../firebase'
import { useQuery, useMutation } from '@apollo/client'
import PasswordDialog from '../../components/PasswordDialog'
import { USER_DETAILS } from '../../graphql/queries'
import { UPDATE_USER_DETAILS } from '../../graphql/mutations'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { AuthContext } from '../../context/authContext'
import ImageMenu from '../../components/user/ImageMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  main: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: { width: '95%' },
    [theme.breakpoints.up('md')]: { width: '1280px', maxWidth: '90%' },
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    minHeight: '400px',
    border: '2px solid',
    margin: '20px 0',
    padding: '0 0 20px 0',
    borderRadius: '1em',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconH1: {
    fontSize: '40px',
    marginRight: '10px',
  },
  mainGrid: {
    padding: '10px',
  },
  leftGrid: {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    marginBottom: '20px',
    width: '90%',
    margin: '15px 0',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    width: '90%',
    maxWidth: '400px',
    borderRadius: '9999em',
    margin: '15px 0 10px 0',
    border: '1px solid',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
      width: '90%',
    },
  },
  passwordButton: {
    backgroundColor: '#fce4ec',
    color: 'black',
    width: '90%',
    maxWidth: '400px',
    borderRadius: '9999em',
    margin: '15px 0 30px 0',
    border: '1px solid',
    '&:hover': {
      backgroundColor: '#fce4ec',
      color: 'black',
      width: '90%',
    },
  },
  image: {
    border: '1px solid',
    [theme.breakpoints.down('xs')]: { maxWidth: '80%', heading: '200px' },
    [theme.breakpoints.up('sm')]: { maxWidth: '100%', height: '350px' },
    boxShadow:
      'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  },

  accordionStyle: {
    width: '80%',
    margin: '10px 0',
    '& .MuiAccordionSummary-root': {
      minHeight: '30px',
      height: '30px',
    },
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  imagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageInContainer: {
    height: '80px',
    margin: '10px',
    '&:hover': {
      border: '1px solid',
      cursor: 'pointer',
    },
  },
  imageDiv: {
    marginBottom: '30px',
  },
}))

const UserProfile = () => {
  const { state: contextState } = useContext(AuthContext)
  const { user } = contextState

  const classes = useStyles()
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passwordLoading: '',
    passwordError: '',
    passwordSuccess: '',
    images: [],
    imageToUpload: '',
    uploadLoading: '',
    uploadError: '',
    deleteLoading: '',
    deleteError: '',
    profileLoading: '',
    profileError: '',
    imgMenu: false,
    imgPublic_id: '',
    about: '',
    loading: '',
    error: '',
    success: '',
    dialog: false,
  })

  const {
    username,
    email,
    about,
    error,
    images,
    imageToUpload,
    uploadLoading,
    uploadError,
    password,
    passwordConfirm,
    passwordError,
    passwordLoading,
    passwordSuccess,
    deleteError,
    deleteLoading,
    profileLoading,
    profileError,
    imgMenu,
    imgPublic_id,
    loading,
    success,
    dialog,
  } = state

  //querys
  const { data, loading: loadingUser, error: userError } = useQuery(
    USER_DETAILS
  )

  //mutations

  const [userUpdate] = useMutation(UPDATE_USER_DETAILS)

  useMemo(() => {
    if (data) {
      setState({
        username: data.userDetails.username,
        about: data.userDetails.about,
        email: data.userDetails.email,
        images: data.userDetails.images,
      })
    }
  }, [data])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setState({ ...state, imageToUpload: e.target.files[0] })
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    setState({ ...state, passwordLoading: true })
    try {
      if (!password) {
        return setState({
          ...state,
          passwordLoading: false,
          passwordError: 'Password cannot be empty',
        })
      }
      if (password.length < 8) {
        return setState({
          ...state,
          passwordLoading: false,
          passwordError: 'Password has to be at least 8 characters long.',
        })
      }

      if (password !== passwordConfirm) {
        return setState({
          ...state,
          passwordLoading: false,
          passwordError: 'The passwords do not match, please try again.',
        })
      }
      await auth.currentUser.updatePassword(password)

      return setState({
        ...state,
        passwordLoading: false,
        passwordSuccess: 'Password updated succefully.',
        passwordError: '',
        password: '',
        passwordConfirm: '',
      })
    } catch (error) {
      setState({
        ...state,
        passwordLoading: false,
        passwordError: error.message,
        passwordSuccess: '',
      })
    }
  }

  const handleDetailsUpdate = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    if (!username && !about) {
      return setState({
        ...state,
        loading: false,
        error: 'The fields cannot be empty',
      })
    }
    try {
      await userUpdate({
        variables: { input: { username, about } },
      })
    } catch (error) {
      console.log(error)
      setState({ ...state, loading: false, error: error.message })
    }
  }

  const handleImageUpload = async (e) => {
    e.preventDefault()
    setState({ ...state, uploadLoading: true })

    if (!imageToUpload) {
      return setState({
        ...state,
        uploadLoading: false,
        uploadError: 'Error: Please choose an image to upload',
      })
    }
    try {
      Resizer.imageFileResizer(
        imageToUpload,
        300,
        300,
        'auto',
        100,
        0,
        (uri) => {
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/uploadImages`,
              { image: uri, email: user.email },
              {
                headers: {
                  authtoken: user.token,
                },
              }
            )
            .then(({ data }) =>
              setState({ ...state, images: data.images, uploadLoading: false })
            )
            .catch((err) =>
              setState({
                ...state,
                uploadError: err.response.data.error,
                uploadLoading: false,
              })
            )
        },
        'base64'
      )
    } catch (error) {
      console.log(error)
      setState({ ...state, uploadError: 'Error: Could not upload the image' })
    }
  }

  const handleImageDelete = async () => {
    setState({ ...state, deleteLoading: true })
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        { imageId: imgPublic_id, email: user.email },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      setState({
        ...state,
        images: data.images,
        deleteLoading: false,
        imgMenu: false,
      })
    } catch (error) {
      console.log(error)
      setState({
        ...state,
        deleteError: 'Error: Could not delete the image',
        deleteLoading: false,
        imgMenu: false,
      })
    }
  }

  const handleProfileImage = async () => {
    setState({ ...state, profileLoading: true })
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_REST_ENDPOINT}/setProfileImage`,
        { imageId: imgPublic_id, email: user.email },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      setState({
        ...state,
        images: data.images,
        profileLoading: false,
        imgMenu: false,
      })
    } catch (error) {
      console.log(error)
      setState({
        ...state,
        profileError: 'Error: Could not set profile image',
        imgMenu: false,
        profileLoading: false,
      })
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <>
          <div className={classes.heading}>
            <PersonIcon className={classes.iconH1} /> <h1>User Profile</h1>
          </div>
          <Grid container className={classes.mainGrid}>
            {loadingUser && (
              <Grid item xs={12}>
                <Spinner />
              </Grid>
            )}
            <Grid className={classes.leftGrid} item xs={12} md={6}>
              <div className={classes.imageDiv}>
                {
                  <img
                    className={classes.image}
                    src={images.length > 0 && images[0].url}
                    alt='Error '
                  />
                }
                <form onSubmit={handleImageUpload}>
                  <input
                    style={{
                      fontSize: '15px',
                      display: 'flex',
                      padding: '20px',
                    }}
                    labelId='images'
                    type='file'
                    accept='image/*'
                    name='imagetoUpload'
                    onChange={handleImageChange}
                  />
                  {uploadError && (
                    <Alerts
                      type={'error'}
                      variable={uploadError}
                      close={() => setState({ ...state, uploadError: '' })}
                      textColor={'black'}
                    />
                  )}

                  {uploadLoading ? (
                    <Spinner />
                  ) : (
                    <Button
                      fullWidth
                      startIcon={<CameraAltOutlinedIcon />}
                      variant='contained'
                      className={classes.button}
                      type='submit'
                    >
                      Upload Image
                    </Button>
                  )}
                </form>
              </div>

              {deleteError && (
                <Alerts
                  type={'error'}
                  variable={deleteError}
                  close={() => setState({ ...state, deleteError: '' })}
                  textColor={'black'}
                />
              )}

              {profileError && (
                <Alerts
                  type={'error'}
                  variable={profileError}
                  close={() => setState({ ...state, profileError: '' })}
                  textColor={'black'}
                />
              )}

              <Accordion className={classes.accordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1-content'
                  id='panel1-header'
                >
                  <h3>User Details</h3>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <p>User name: {username && username}</p>
                  <p>User email: {email && email}</p>
                  <p>About: {about && about}</p>
                </AccordionDetails>
              </Accordion>

              <Accordion className={classes.accordionStyle}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2-content'
                  id='panel2-header'
                >
                  <h3>User Images</h3>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <div className={classes.imagesContainer}>
                    {images && images.length > 0 ? (
                      images.map((img) => (
                        <img
                          aria-controls='imageMenu'
                          aria-haspopup='true'
                          className={classes.imageInContainer}
                          src={img.url}
                          key={img.public_id}
                          onClick={(e) =>
                            setState({
                              ...state,
                              imgMenu: e.currentTarget,
                              imgPublic_id: img.public_id,
                            })
                          }
                          alt='failed to upload'
                        />
                      ))
                    ) : (
                      <p>User has no images</p>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid className={classes.leftGrid} item xs={12} md={6}>
              <h3>Update Details</h3>

              <form onSubmit={handleDetailsUpdate}>
                <TextField
                  onChange={handleChange}
                  value={username}
                  className={classes.inputField}
                  name='username'
                  label='New User name'
                  type='text'
                  helperText='Enter new User name if you want to change it'
                />

                <TextField
                  onChange={handleChange}
                  value={about}
                  className={classes.inputField}
                  rows={5}
                  multiline
                  name='about'
                  label='About myself'
                  type='text'
                  helperText='Write something about yourself'
                />

                {error && (
                  <Alerts
                    type={'error'}
                    variable={error}
                    close={() => setState({ ...state, error: '' })}
                    textColor={'black'}
                  />
                )}

                {userError && (
                  <Alerts
                    type={'error'}
                    variable={'Error, please try again'}
                    textColor={'black'}
                  />
                )}

                {success && (
                  <Alerts
                    type={'success'}
                    variable={success}
                    close={() => setState({ ...state, success: '' })}
                    textColor={'black'}
                  />
                )}

                {loading ? (
                  <Spinner />
                ) : (
                  <Button
                    className={classes.button}
                    type='submit'
                    fullWidth
                    variant='contained'
                  >
                    Update Details
                  </Button>
                )}
              </form>
              <Button
                className={classes.passwordButton}
                onClick={() => setState({ ...state, dialog: true })}
                type='submit'
                fullWidth
                variant='contained'
              >
                change password
              </Button>
            </Grid>

            <PasswordDialog
              dialog={dialog}
              state={state}
              setState={setState}
              handleChange={handleChange}
              password={password}
              classes={classes}
              passwordConfirm={passwordConfirm}
              passwordError={passwordError}
              passwordSuccess={passwordSuccess}
              passwordLoading={passwordLoading}
              handlePasswordUpdate={handlePasswordUpdate}
            />
            <ImageMenu
              state={state}
              setState={setState}
              imgMenu={imgMenu}
              handleImageDelete={() => handleImageDelete()}
              handleProfileImage={() => handleProfileImage()}
            />
          </Grid>
        </>
      </div>
    </div>
  )
}

export default UserProfile
