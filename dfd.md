# Data Flow &amp; Entity-Relationship Diagrams

This document provides a detailed visual representation of the data architecture for the "Look in Dharamshala" website, including Data Flow Diagrams (DFD) and an Entity-Relationship (ER) Diagram.

**Diagram Key:**
-   `+----------------+` : External Entity (e.g., User, External Service)
-   `( Process Name )` : A system process that transforms data.
-   `| Data Store   |` : A place where data is stored (e.g., a database table).
-   `--- Data --->` : The flow of data between entities, processes, and stores.

---

## Data Flow Diagram (DFD) - Level 0 (Context Diagram)

This diagram shows the entire system as a single process, illustrating its interaction with external entities. It provides a high-level overview of the system's boundaries.

```
+-----------------+
| Business Owner  |
+-----------------+
        |
        | Business Listing Details
        v
+-----------------+       +-----------------------+       +-----------------------+
|    Traveler     |------>|                       |------>|  External Map Service |
| (General User)  |<------|  Look in Dharamshala  |<------|    (e.g., Google Maps)|
+-----------------+       |        Website        |       +-----------------------+
                          |                       |
                          +-----------------------+
        ^       |
        |       | Site Content, Search Results, Budget Estimates
        |
        | Search Queries, Page Requests, Trip Plan Inputs, Contact Data
        |
        +-----------------------------------------------------------------
```

---

## Data Flow Diagram (DFD) - Level 1

This diagram breaks down the main system into its core sub-processes, showing the primary data flows between them and to the data stores.

```
+----------+
| Traveler |
+----------+
     |
     | Search Query, Page Request
     v
( 1.0 Manage Content &amp; Search ) ----> | Services Data |
     ^                                  | (Static)      |
     |                                  +---------------+
     | Filtered Results, Page Content
     |
     +--------------------------------------------------------------------------------+
     |                                                                                |
     | Trip Plan Inputs                                                               |
     v                                                                                |
( 2.0 Plan Trip )                                                                     |
     ^                                                                                |
     | Budget Estimate                                                                |
     |                                                                                |
     +--------------------------------------------------------------------------------+
     |                                                                                |
     | Contact Form Data                                                              |
     v                                                                                |
( 3.0 Handle Contact )                                                                |
     ^                                                                                |
     | Confirmation                                                                   |
     |                                                                                |
     +--------------------------------------------------------------------------------+
     |
     | Location Click
     v
( 4.0 Manage Map Interaction ) ----> +-----------------------+
                                     |  External Map Service |
                                     +-----------------------+


+----------------+
| Business Owner |
+----------------+
     |
     | New Business Details
     v
( 5.0 Manage Business Listings ) ----> | Pending Listings |
                                       | (localStorage)   |
                                       +------------------+
```

---

## Data Flow Diagram (DFD) - Level 2

This diagram provides a more detailed look at the "Manage Content &amp; Search" process (1.0) from the Level 1 DFD.

```
+----------+
| Traveler |
+----------+
     |
     | Search Term, Category Filter
     v
( 1.1 Process Search &amp; Filter )
     |
     | Matched Criteria
     v
( 1.2 Retrieve Service Data ) <---- | Services Data |
     |                                | (Static)      |
     | Service List                   +---------------+
     v
( 1.3 Format &amp; Display Results )
     |
     | Formatted Page Content
     v
+----------+
| Traveler |
+----------+
```

---

## Entity-Relationship (ER) Diagram

This diagram models the structure for a potential future database (e.g., using Supabase). It shows the main data entities and the relationships between them.

**Relationship Key:**
-   `---` : A one-to-one relationship.
-   `--&lt;` : A one-to-many relationship (the `&lt;` points to the "many" side).

```
+-------------+
|    Users    |
|-------------|
| PK user_id  |
|    name     |
|    email    |
|    role     |
+-------------+
      |
      | owns
      |
      +------&lt; +-------------+
               |   Services  |
               |-------------|
               | PK service_id|
               | FK owner_id |
               |    name     |
               |  category   |
               | description |
               |  location   |
               |   rating    |
               +-------------+
                     |
                     | has
                     |
                     +------&lt; +-------------+
                              |   Reviews   |
                              |-------------|
                              | PK review_id|
                              | FK user_id  |
                              | FK service_id|
                              |    rating   |
                              |   comment   |
                              +-------------+
                                    ^
                                    |
                                    | writes
                                    |
+-------------+---------------------+
|    Users    |
+-------------+
```

### Explanation of Relationships:

1.  **Users to Services (One-to-Many):**
    -   One `User` (with the role of 'Business Owner') can own **many** `Services`.
    -   Each `Service` is owned by exactly **one** `User`.

2.  **Users to Reviews (One-to-Many):**
    -   One `User` can write **many** `Reviews`.
    -   Each `Review` is written by exactly **one** `User`.

3.  **Services to Reviews (One-to-Many):**
    -   One `Service` can have **many** `Reviews`.
    -   Each `Review` is for exactly **one** `Service`.