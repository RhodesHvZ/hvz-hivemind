# UserManager Store
```
{
  <username>: {
    sub,
    given_name,
    family_name,
    email,
    players: [{
      game, // UUID of game
      nickname
    }],
    achievements: [{
      gameName,
      timestamp,
      name,
      describtion
    }],
    profilePicture,
    userSettings: {
      ...
    }
  }
}
```

Elastic Search:

```
PUT /<index>/<type>/<userid/sub>
{
  sub,
  name,
  given_name,
  family_name,
  nickname,
  picture,
}
```

Google ID Token:

```
{"iss":"accounts.google.com",
 "sub":"10769150350006150715113082367",
 "azp":"1234987819200.apps.googleusercontent.com",
 "email":"jsmith@example.com",
 "aud":"1234987819200.apps.googleusercontent.com",
 "iat":1353601026,
 "exp":1353604926,
 "hd":"example.com" }
```