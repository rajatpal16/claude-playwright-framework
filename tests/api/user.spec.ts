import {test, expect} from '@playwright/test';
test ('GEt request returns a list of users', async({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    // 1. assert the status code is 200
    expect(response.status()).toBe(200);
  // 2. parse the JSON body
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);
  // 3. assert the response is an array with more than 0 items
  expect(Array.isArray(responseBody)).toBe(true);
  expect (responseBody.length).toBeGreaterThan(0);

})

test ('Post request create a new user', async({request}) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data : {
            name : 'Rajat Pal',
            job : 'QA Automation Engineer'
        }
    })
    // 1. assert status code is 201 (Created)
    expect (response.status()).toBe(201);
  // 2. parse the response body
    const responseBody = await response.json();
    console.log('Created User:',responseBody);
  // 3. assert the response body contains the name you sent
  expect(responseBody).toMatchObject({ name: 'Rajat Pal' });
  //expect(responseBody.name).toBe('Rajat Pal');
  //expect (responseBody).toEqual(expect.objectContaining({name : 'Rajat Pal'}))
})

//bearer token concepts
test ('Login returns a access token', async({request}) => {
    const response = await request.post('https://dummyjson.com/auth/login',{
        data : {
            username: 'emilys',
            password: 'emilyspass'
        }
    })
    expect (response.status()).toBe(200);
    const body = await response.json();
    console.log('Token:',body.accessToken);
    expect (body.accessToken).toBeTruthy();
})


//use token for authenticated request
test ('Use token for authenticated request', async({request}) => {
    //Login and get token
    const loginResponse = await request.post('https://dummyjson.com/auth/login',{
        data : {
            username: 'emilys',
            password: 'emilyspass'
        }
    })
    expect (loginResponse.status()).toBe(200);
    const {accessToken} =await loginResponse.json();

   // pass the token in subsequesnt request
const userResponse = await request.get('https://dummyjson.com/auth/me',{
    headers: {
        'Content-Type' : 'application/json',
        'authorization' : `Bearer ${accessToken}`
    }
})
expect (userResponse.status()).toBe(200);
})
//------------------------------------------------------------------------------
test ('Request without token is rejected', async({request}) => {
    const reqResponse = await request.get('https://dummyjson.com/auth/me',{
        headers : {
            'Content-Type' : 'application/json',
            'authorization' : `Bearer invalid123`
        }
    })
    expect (reqResponse.status()).toBe(401);
    console.log('ResponseStaus:',reqResponse.status());

})