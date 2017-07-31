# Database

## DBMS

Using CouchDB/PouchDB. Synchronizing an embedded instance with a remote instance. Eventual consistency in return for zero network delay on IO etc. Libs already exist (_@trust/model_).

## Design

* Separated into system and game state.
* System consists of user related information:
    - OIDC login info
    - User PMs
    - Ticketing System
    - Achievements
    - Game Configuration
    - Minimal system configuration (system administrators, initial system configuration etc.)
    - Notifications (probably going to be a bit of duplicate data here), ideally linked to an action.
* Game engine maintains the in-game state machine.
    - Player state (inactive, human, zombie, special (human or zombie), suspended or starved)
    - Player state is maintained by publishing actions to a write-only database.
    - State is determined by the reduction of the entire events database.
    - Separate events database per game. System pre-loads most recent game, unless configured to load a specific game.
    - Each type of event has its own schema, but publishes to the same database.
    - Supporting tables for codes => entity_id mapping etc.

## Actions

* Register
* Activate (from `inactive`, `suspended` or `starved`)
* Deactivate
* Bite
* Revive
* Transfer Game Ownership
* Promote (Special state - Administrator, Commando, etc.)
* Demote (Special state - Administrator, Commando, etc.)
* Suspend
* Starve
* Reward
* Join Squad

## UML

All diagrams generated using [this](https://yuml.me/diagram/scruffy/class/draw) tool.

### AbstractAction

Definition:

```
[AbstractAction|id:uuid;type:string;timestamp:long{bg:violet}]
```

Use in other diagrams:

```
[AbstractAction{bg:violet}]
```

### RegisterAction

```

```
