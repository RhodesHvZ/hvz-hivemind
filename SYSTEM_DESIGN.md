# System

System is made up of the client application and the central service.

The central service serves the single-page client application over HTTP(S) and maintains state. The client application communicates with the server and dispatches actions and queries via websocket over HTTP (socket.io).

All possible actions and queries are handled at single point and dispatched to the necessary handlers to validate and execute the actions contained therein. All "requests" made to the server must be added to the event log for posterity.

The use of websockets instead of a standard REST architecture allows greater specificity of actions to be taken as well as bi-directional communication between the server and client.

## Request Flow

Like standard REST actions, each request/query made to the server needs to be handled by an explicit handler class. Handler classes should be asynchronous.

Each handler should include the following:

1. Handler object construction
2. Input validation
3. Access control validation
4. Data acquisition (if necessary)
5. Socket acquisition (if necessary)
6. Manage handler state and notify client of progress with heartbeat

## Data Managers

Data managers are abstractions between modeled objects (in code) and the database. Their purpose is to make creating, accessing, updating or removing specific data simple from the perspective of the request handlers.

The structure of the managers is hierarchical.

### Hierarchy

1. System
    + Game
        * Player
        * Squad
        * Mission
    + User
    + Ticket
    + Achievement

### System

Responsible for managing the state of the overall system. More specifically:

* System settings
* System administrators

The system is itself not a manager as it is the container of all other managers.

### User

Responsible for maintaining state about the various users of the system.

Specifically the user manager should know the following about each user:

* User data (name, surname, email, etc.)
* Online state
* Socket ID (if online)

Additionally, the user manager should contain the server-initiated communication logic such as notifications. In the event a user is to be sent a notification but they are offline, the server should provision a mailbox for the user for the next time they are online.

### Ticket

Responsible for maintaining a record of all official discussion related to the system. This is a single service that is shared across all games and while tickets may relate to a particular game, they are separate from the game itself -- and the players and instead are tied to the users.

The ticket system is **for the system** not for any one particular game. Complaints relating to a particular game can be handled through tickets (should be tagged where appropriate) however tickets are to be handled by system administrators as opposed to game administrators.

### Achievements

Responsible for maintaining the progress toward each achievement of each user.

This will be done by maintaining a central store and having many subscribers to internal events as emitted by the other managers of the system.

### Game

Responsible for maintaining and accessing the various games that exist within the system.

Each game should contain the main game state (pre-reg, reg-open, started, ended) as well as manage the game settings, administrators and various faction and game scores.

Each game contains its own set of managers specific to that game; namely: Player, Squad and Mission.

### Player

Responsible for maintaining the state of each player within a particular game.

A player is mapping between a user and a game. Each game has its own player manager and therefore each user will have a separate "player" for each game.

All internal events related to players must contain a reference to the game they originate from.

Each player should record the following state:

* Game state (human, zombie, inactive or admin)
* Progress on objectives achieved. Objectives may include:
    - Supply Drops
    - Night missions
    - Day missions
    - Checkpoints(?)
    - Long-running multi-objective quests
* Special state (can be multiple) (OZ, Human Commando, Advanced Zombie, etc.)
    - Special states are not lost on "death"
* A complete log of all actions taken by or on the player (i.e. tagged player X, revived by admin, etc.)

### Squad

A squad is a collection of players per faction. Squads should have an upper limit on membership set (a policy decision) to discourage factions having one massive squad.

Squads need to store the following state:

* A list of players and their ranks within the squad.
* Associated faction (human or zombie)
* Squad score
* Overall squad state. (active, disbanded or KIA)
* Progress on squad objectives
* A complete log of all related actions

### Mission

Each mission must contain the following:

* title
* description
* faction (human, zombie -- explicitly cannot have both)
* At least one objective.
    - Each objective needs to contain a title, description, location (gps) and type (i.e. player objective, squad objective, etc.)

Each objective serves as the template for the data stored on the player

PvP missions should be executed by creating two separate missions (one for each faction)
