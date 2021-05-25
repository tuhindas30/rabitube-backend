const express = require("express");
const router = express.Router();
const VideoController = require("../controllers/video.controller");
const UserController = require("../controllers/user.controller");
const LikeController = require("../controllers/like.controller");
const WatchlaterController = require("../controllers/watchlater.controllers");
const PlaylistController = require("../controllers/playlist.controller");

router.get("/", UserController.getAllUsers);

router.param("userId", UserController.findUser);

router
  .route("/:userId")
  .get(UserController.getUser)
  .post(UserController.updateUser);

router
  .route("/:userId/liked")
  .get(LikeController.getLikedVideos)
  .post(LikeController.saveToLike);

router
  .route("/:userId/watchlater")
  .get(WatchlaterController.getWatchlaterVideos)
  .post(WatchlaterController.saveToWatchlater);

router.param("vId", VideoController.findVideo);

router.delete("/:userId/liked/:vId", LikeController.removeFromLiked);

router.delete(
  "/:userId/watchlater/:vId",
  WatchlaterController.removeFromWatchlater
);

router
  .route("/:userId/playlists")
  .get(PlaylistController.getAllPlaylists)
  .post(PlaylistController.createNewPlaylist);

router.param("pId", PlaylistController.findPlaylist);

router
  .route("/:userId/playlists/:pId")
  .get(PlaylistController.getPlaylistVideos)
  .post(PlaylistController.saveToPlaylist)
  .delete(PlaylistController.deletePlaylist);

router.delete(
  "/:userId/playlists/:pId/:vId",
  PlaylistController.deletePlaylistVideo
);

module.exports = router;
