# Errors

The Budgetal API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request sucks
401 | Unauthorized -- Your API key and token is wrong
403 | Forbidden -- The request is hidden for administrators only
404 | Not Found -- The specified end point could not be found
406 | Not Acceptable -- You requested a format that isn't json
418 | I'm a teapot
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintanance. Most likely bringing you updates. Please try again later.
