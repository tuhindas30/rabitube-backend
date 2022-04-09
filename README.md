# RabiTube Backend API Server

## Tech Stack

- NodeJs
- ExpressJs
- MongoDB

## API Routes

### /api/auth

- POST /signup to register new user.
- POST /signin to authenticate a user.
- POST /change-password to change user password.

### /api/users

- GET /{userId} to get the user with `userId`.
- GET /{userId}/liked to get the user's liked playlist.
- GET /{userId}/playlists to get the user's playlist collection.
- GET /{userId}/playlists/{playlistId} to get the user's playlist with `playlistId`.
- GET /{userId}/watchlater to get the user's watch later playlist.
- POST /{userId} to update the user with `userId`.
- POST /{userId}/liked to insert new video to liked playlist.
- POST /{userId}/playlists to insert new playlist.
- POST /{userId}/watchlater to insert new video to watch later playlist.
- POST /{userId}/playlists/{playlistId} to add video to playlist with `playlistId`.
- DELETE /{userId}/liked/{videoId} to delete a video with `videoId` from liked playlist.
- DELETE /{userId}/playlists/{playlistId} to delete a playlist with `playlistId`.
- DELETE /{userId}/playlists/{playlistId}/{videoId} to delete a video with `videoId` from playlist with `playlistId`.
- DELETE /{userId}/watchlater/{videoId} to delete a video with `videoId` from watch later playlist.

### /api/categories

- GET / to get all categories.
- GET /{categoryId} to get the category with `categoryId`.
- POST / to create new category (Admin).
- DELETE /{categoryId} to delete the category with `categoryId` (Admin).

### /api/videos

- GET / to get all videos.
