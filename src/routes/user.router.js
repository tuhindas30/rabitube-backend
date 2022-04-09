const express = require("express");
const router = express.Router();

const PlaylistController = require("../controllers/playlist/playlist.controller");
const LikeController = require("../controllers/liked/liked.controller");
const WatchlaterController = require("../controllers/watchlater/watchlater.controller");
const HistoryController = require("../controllers/history/history.controller");
const UserController = require("../controllers/user.controller");
const { verifyAuth } = require("../middlewares/verifyAuth");

router.use(verifyAuth);
router.get("/", UserController.getAllUsers);
router
  .route("/watchlater")
  .get(WatchlaterController.getWatchlaterByUserId)
  .post(WatchlaterController.saveToWatchlater);
router.delete(
  "/watchlater/:videoId",
  WatchlaterController.removeFromWatchlater
);
router
  .route("/liked")
  .get(LikeController.getLikedPlaylistByUserId)
  .post(LikeController.saveOrRemoveLikedItems);
router.delete("/liked/:videoId", LikeController.removeFromLikedPlaylist);
router
  .route("/playlists")
  .get(PlaylistController.getPlaylistCollectionByUserId)
  .post(PlaylistController.createNewPlaylist);
router
  .route("/playlists/:playlistId")
  .get(PlaylistController.getPlaylistByPlaylistId)
  .post(PlaylistController.addToPlaylist)
  .delete(PlaylistController.deletePlaylist);
router.delete(
  "/playlists/:playlistId/:videoId",
  PlaylistController.removeFromPlaylist
);
router
  .route("/history")
  .get(HistoryController.getHistoryByUserId)
  .post(HistoryController.addToHistory)
  .delete(HistoryController.removeUserHistory);

router.delete("/history/:videoId", HistoryController.removeFromHistory);

router
  .route("/:userId")
  .get(UserController.getUserById)
  .post(UserController.updateUserById)
  .delete(UserController.deleteUserById);

module.exports = router;
