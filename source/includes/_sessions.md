# Sessions

## Sign In

```shell
curl "https://api.budgetal.com/sessions/sign-in" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST -d '{"user": {"email":"mail@example.org","password":"secret"}}'
```

```javascript
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const params = {
  user: {
    email: 'emily@example.org',
    password: 'secret',
  }
};

const body = JSON.stringify(params);
const method = 'POST';

try {
  const resp = await fetch('https://api.budgetal.com/sessions/sign-in', {method, headers, body})
  if (resp !== null) {
    return resp.json()
  }
} catch(err) {
  console.log(err)
}
```

> The above command returns JSON structured like this:

```json
{
  "session": {
    "authentication_key": "26a2eb91-db0e-87eb-2755-0769ab492ea51",
    "authentication_token": "a36b4b3e73083ac99c4094a19f314c50",
    "user_agent": "curl/7.43.0",
    "ip": "::1",
    "created_at": "2016-06-21T19:01:12.749Z"
  },
  "user": {
    "first_name": "Emily",
    "last_name": "Skywalker",
    "email": "emily@example.org",
    "admin": true,
    "avatar": "data:image/jpeg;base64,/QVBAAAACBi\n"
  },
  "success": true
}
```

This endpoint signs in the user.

### HTTP Request

`POST https://api.budgetal.com/sessions/sign-in`

### POST Parameters

Parameter | Required | Description
--------- | ------- | -----------
email | Yes | Email address of the account to sign in.
password | Yes | Password of the account to sign in.

<aside class="success">
Remember — nest all parameters under user. <code>{user: ...}</code>
</aside>
