# Design

**Event Driven**

The system should operate by reducing game state from a sequence of events. On system start the event log should be retrieved and then reduced into an in-memory game state.

Subsequent events will be reduced into a new game state.

**System Start**

System should initialize by retrieving the list of events from the database. Only _input_ events should be replayed as the subsequent _system_ events will be regenerated.

**Running**

While the system is running. It should accept events from clients and reduce them.

**Store**

Should this be global or should it exist on each manager?

**Managers**

All singletons.

Create, get (read), update and delete methods in manager classes.

Action methods (i.e. kill, revive) in manager classes.

Each manager is independent and manages a particular aspect of the system. i.e. UserManager manages all changes made to Users.

The state of the system must be readable by all managers. Writing to the state _must_ be done through the relevant manager.

Gettings instances of game objects must be done through the manager.

Managers will store local state (within scope) and be hierarchical. i.e. System contains multiple games which each contain multiple players.

## Hierarchy

1. System
    + Game
        * Player
        * Squad
        * Mission
    + User
    + Ticket
    + Achievement
