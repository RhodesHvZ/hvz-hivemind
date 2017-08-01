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
* New Bite Code
* Player Update
* Activate (from `inactive`, `suspended` or `starved`)
* Deactivate
* Suspend
* Starve
* Bite
* Revive
* Transfer Game Ownership
* Promote (Special state - Administrator, Commando, etc.)
* Demote (Special state - Administrator, Commando, etc.)
* Reward
* Join Squad

## UML

All diagrams generated using [this](https://yuml.me/diagram/scruffy/class/draw) tool.

### AbstractAction

Definition:

```
[AbstractAction|id:long;type:string;{bg:violet}]
```

Use in other diagrams:

```
[AbstractAction{bg:violet}]
```

### RegisterAction

Definition:

```
[RegisterAction|user_id:uuid;player_id:uuid;game_id:uuid;display_name:string;bite_code:string;hall:string;picture:url;]->extends[AbstractAction{bg:violet}]
```

### AbstractAdminAction

Definition:

```
[AbstractAdminAction|admin_id:uuid;reason:string;{bg:orange}]->extends[AbstractAction{bg:violet}]
```

Use in other diagrams:

```
[AbstractAdminAction{bg:orange}]
```

### RenewBiteCodeAction

Definition:

```
[RenewBiteCodeAction|player_id:uuid;game_id:uuid;admin_id:uuid;bite_code:string;reason:string]->extends[AbstractAction{bg:violet}]
```

### PlayerUpdateAction

Definition:

```
[PlayerUpdateAction|player_id:uuid;game_id:uuid;display_name:string;picture:url;]->extends[AbstractAction{bg:violet}]
```

### ActivateAction

Definition:

```
[ActivateAction|player_id:uuid;game_id:uuid;]->extends[AbstractAdminAction{bg:orange}]
```

### PunishmentAction

Definition:

```
[AbstractPunishmentAction|player_id:uuid;game_id:uuid;{bg:red}]->extends[AbstractAdminAction{bg:orange}]
```

Use in other diagrams:

```
[AbstractPunishmentAction{bg:red}]
```

### DeactivateAction

Definition:

```
[DeactivateAction]->extends[AbstractPunishmentAction{bg:red}]
```

### SuspendAction

Definition:

```
[SuspendAction|until:long;]->extends[AbstractPunishmentAction{bg:red}]
```

### StarveAction

Definition:

```
[StarveAction]->extends[AbstractPunishmentAction{bg:red}]
```

### BiteAction

Definition:

```
[BiteAction|zombie_id:uuid;human_id:uuid;game_id:uuid;lat:number;lon:number;note:string]->extends[AbstractAction{bg:violet}]
```

### KillAction

Definition:

```
[KillAction|player_id:uuid;game_id:uuid;]->extends[AbstractAdminAction{bg:orange}]
```

### AdminReviveAction

Definition:

```
[AdminReviveAction|player_id:uuid;game_id:uuid;]->extends[AbstractAdminAction{bg:orange}]
```

### SuperstateAction

Definition:

```
[SuperstateAction|player_id:uuid;superstate:string;]->extends[AbstractAdminAction{bg:orange}]
```

### RemoveSuperstateAction

Definition:

```
[RemoveSuperstateAction|player_id:uuid;superstate:string;]->extends[AbstractAdminAction{bg:orange}]
```

### AbstractRewardAction

Definition:

```
[AbstractRewardAction|player_id:uuid;game_id:uuid;delta:object;note:string;{bg:violet}]->extends[AbstractAction{bg:violet}]
```

Use in other diagrams:

```
[AbstractRewardAction{bg:violet}]
```

### PlayerReviveAction

Definition:

```
[PlayerReviveAction]->extends[AbstractRewardAction{bg:violet}]
```

### MissionRewardAction

Definition:

```
[MissionRewardAction|delta.mission:number;]->extends[AbstractRewardAction{bg:violet}]
```

### OtherRewardAction

Definition:

```
// TODO
```

### SquadCreateAction

Definition:

```
[SquadCreateAction|player_id:uuid;game_id:uuid;squad_id:uuid;name:string;tag:string;description:string;picture:url;ranks:object;]->extends[AbstractAction{bg:violet}]
```

### SquadJoinAction

Definition:

```
[SquadJoinAction|player_id:uuid;game_id:uuid;squad_id:uuid;]->extends[AbstractAction{bg:violet}]
```

### SquadConfirmJoinAction

Definition:

```
[SquadConfirmJoinAction|player_id:uuid;game_id:uuid;squad_id:uuid;leader_id:uuid;rank:string;]->extends[AbstractAction{bg:violet}]
```

### SquadUpdateAction

Definition:

```
[SquadUpdateAction|player_id:uuid;game_id:uuid;squad_id:uuid;description:string;picture:url;ranks:object;]->extends[AbstractAction{bg:violet}]
```

### SquadRankAction

Definition:

```
[SquadRankAction|player_id:uuid;game_id:uuid;squad_id:uuid;leader_id:uuid;rank:string;]->extends[AbstractAction{bg:violet}]
```

### Result Code (_updated 01 Aug 17_)

```
[AbstractAction|id:long;type:string;{bg:violet}]
[RegisterAction|user_id:uuid;player_id:uuid;game_id:uuid;display_name:string;bite_code:string;hall:string;picture:url;]->extends[AbstractAction{bg:violet}]
[AbstractAdminAction|admin_id:uuid;reason:string;{bg:orange}]->extends[AbstractAction{bg:violet}]
[AbstractPunishmentAction|player_id:uuid;game_id:uuid;{bg:red}]->extends[AbstractAdminAction{bg:orange}]
[RenewBiteCodeAction|player_id:uuid;game_id:uuid;bite_code:string;]->extends[AbstractAdminAction{bg:orange}]
[PlayerUpdateAction|player_id:uuid;game_id:uuid;display_name:string;picture:url;]->extends[AbstractAction{bg:violet}]
[ActivateAction|player_id:uuid;game_id:uuid;]->extends[AbstractAdminAction{bg:orange}]
[DeactivateAction]->extends[AbstractPunishmentAction{bg:red}]
[SuspendAction|until:long;]->extends[AbstractPunishmentAction{bg:red}]
[StarveAction]->extends[AbstractPunishmentAction{bg:red}]
[BiteAction|zombie_id:uuid;human_id:uuid;game_id:uuid;lat:number;lon:number;note:string]->extends[AbstractAction{bg:violet}]
[KillAction|player_id:uuid;game_id:uuid;]->extends[AbstractAdminAction{bg:orange}]
[AdminReviveAction|player_id:uuid;game_id:uuid;]->extends[AbstractAdminAction{bg:orange}][SuperstateAction|player_id:uuid;superstate:string;]->extends[AbstractAdminAction{bg:orange}]
[RemoveSuperstateAction|player_id:uuid;superstate:string;]->extends[AbstractAdminAction{bg:orange}]
[AbstractRewardAction|player_id:uuid;game_id:uuid;delta:object;note:string;{bg:violet}]->extends[AbstractAction{bg:violet}]
[PlayerReviveAction]->extends[AbstractRewardAction{bg:violet}]
[MissionRewardAction|delta.mission:number;]->extends[AbstractRewardAction{bg:violet}]
[SquadCreateAction|player_id:uuid;game_id:uuid;squad_id:uuid;name:string;tag:string;description:string;picture:url;ranks:object;]->extends[AbstractAction{bg:violet}]
[SquadJoinAction|player_id:uuid;game_id:uuid;squad_id:uuid;]->extends[AbstractAction{bg:violet}]
[SquadConfirmJoinAction|player_id:uuid;game_id:uuid;squad_id:uuid;leader_id:uuid;rank:string;]->extends[AbstractAction{bg:violet}]
[SquadUpdateAction|player_id:uuid;game_id:uuid;squad_id:uuid;description:string;picture:url;ranks:object;]->extends[AbstractAction{bg:violet}]
[SquadRankAction|player_id:uuid;game_id:uuid;squad_id:uuid;leader_id:uuid;rank:string;]->extends[AbstractAction{bg:violet}]
```
