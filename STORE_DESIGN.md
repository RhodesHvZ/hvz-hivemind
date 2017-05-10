# UserManager Store
```
{
  <username>: {
    UUID,
    firstname,
    lastname,
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