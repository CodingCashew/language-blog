import { useState } from 'react';
import { Box, Container, Text, Stack, Input, Button, Divider, Link, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ArrowRightIcon } from "@chakra-ui/icons"

export interface User {
  email: string,
  username?: string,
  password: string
}

const initialValues = {
  email: '',
  username: '',
  password: ''
}

function Login() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [values, setValues] = useState(initialValues);
  const handleChange = (e:any) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]:value,
    })
    // console.log('values:', values)
  }

  const login = () => {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email: values.email, password: values.password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('logged in?:', data)
        setValues(initialValues)
      })
      .catch((err) => {
        // setValues({
        //   email: '',
        //   password: ''
        // })
        // setShow(false)
        console.log(err)
      })
  }

  const oAuth = () => {
    alert('OAuth functionality in progress...')
  }

  return (
    <div >
      <Box
         bgGradient='linear(to-br, tertiary.main, secondary.dark)'
        //  bgColor='secondary.main'
        h="100%"
        w="100%"
        minH="3xl">
        <Container
          maxW="2xl"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <Text fontSize="2xl" paddingY="2rem" color="white"><ArrowRightIcon marginRight="1rem" color="white"/>Continue Your Language Learning Journey</Text>
          <Stack spacing={5} w="75%" >
            <Input
              placeholder='Email Address'
              size='md'
              bgColor="#F7FAFC"
              value={values.email}
              name={"email"}
              onChange={handleChange}/>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Password'
                bgColor="#F7FAFC"
                value={values.password}
                name={"password"}
                onChange={handleChange}
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  bgColor="#E2E8F0"
                  onClick={handleShow}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {/* <Button bgGradient='linear(to-r, secondary.main, tertiary.main)' color="white" onClick={login} >Log In</Button> */}
            <Button bgColor='secondary.main' color="white" onClick={login} >Log In</Button>
            <Button variant="link" fontSize='xs' color="#718096" >Forgot Password?</Button>
            <Container
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center">
              <Divider w="47%" bgColor="#718096"/>
              <Text color="#718096">or</Text>
              <Divider w="47%" bgColor="#718096"/>
            </Container>
            <Button bgColor="primary.dark" color="white" onClick={oAuth} >Log In with Google</Button>
            <Button bgColor="primary.dark" color="white" onClick={oAuth} >Log In with Facebook</Button>
            <Button variant="link" fontSize='xs' color="#718096" ><Link href="/signup"><Text>Dont have an account yet? Sign Up ~</Text></Link></Button>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}

export default Login