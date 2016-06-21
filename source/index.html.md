---
title: Budgetal API Reference

language_tabs:
  - shell
  - javascript

toc_footers:
  - <a href='https://www.budgetal.com'>Budgetal.com</a>
  - <a href='https://github.com/dillonhafer/budgetal'>View on github</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - sessions
  - errors

search: true
---

# Introduction

Welcome to the Budgetal API! You can use our API to access Budgetal endpoints, which can get information on various budgets, budget items, and expenses in our database relating to an account.

We have language examples in Shell and Javascript! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl "https://api.budgetal.com" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-AUTHENTICATION-KEY: key" \
  -H "X-AUTHENTICATION-TOKEN: token"
```

```javascript
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-AUTHENTICATION-KEY': 'key',
  'X-AUTHENTICATION-TOKEN': 'token'
};

try {
  const resp = await fetch('https://api.budgetal.com', {method: 'GET', headers})
  if (resp !== null) {
    return resp.json()
  }
} catch(err) {
  console.log(err)
}
```

> Make sure to replace `key` and `token` with your API key and token.

Budgetal uses API keys and tokens to allow access to the API. You can register a new account by signing up at our [site](https://www.budgetal.com).

Budgetal expects for the API key and token to be included in all API requests to the server in a header that looks like the following:

`X-AUTHENTICATION-KEY: key`

`X-AUTHENTICATION-TOKEN: token`

You will receive these values by logging in a user. These values will need to be stored for later use.

<aside class="notice">
You must replace <code>key</code> and <code>token</code> with your personal API key and token.
</aside>
