# Movie App

An API for uploading, bookmarking & obtaining movie data from TMDB

> [!NOTE]
> This project requires bun & node.js install beforehand

## API

### `GET /movies`

Returns list of movies
***

**Query parameters**
- `searchTerm` - Searches through
  - Title
  - Director
  - Country
  - Genre
  - Colour
- `pageSize` - Specify page size
- `pageNumber` - Specify page number

### `GET /movies/:id`

Returns movie for given id

**Parameters**
- `id` - Movie id
***

### `POST /upload`

Uploads csv file with specified movie fields to store in the database

**Form fields**
- `file` - the csv file containing the records
***

### `POST /generate-token`

Generates a token for a uniquely registered username, can only be generated once & will not be retrieved if lost

**Body values**
- `username` - Desired username associated with token
***

### `POST /bookmark-movie`

- Allows a user to add movie to their collection of bookmarks
- Once a movie is bookmarked, additional info is obtained & permanently stored from TMDB's API.
- Bookmarked movies will only be bookmarked once

**Body values**
- `username` - User's username
- `token` - Associated token
- `movieId` - Movie id to be bookmarked
***

### `POST /bookmarks`

Returns a list of bookmarked movie ids associated to the user

**Body values**
- `username` - User's username
- `token` - Associated token

## Environment variables

- **DATABASE_URL**: Database connection url
- **TMDB_KEY**: TMDB API key

## Setup

- Clone the repository
- Run
  - `bun i`
  - `bun run build`
  - `bun dev`

## Docker

### Compose

- `docker compose up -d`

### Ports

- MongoDB: `27019:27017`
- App: `8080`

## Known issues

- Lack of endpoint body & query parameter type checking
- Error handling edge cases
- Lack of CRUD endpoints
- API security is too simple
  - Relying token generation per user
  - Tokens are generated once and cannot be changed
  - No token encryption in database
- No database seeds for movies