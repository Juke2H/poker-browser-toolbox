import { parseProfiles } from "../newServices/matrixGetServices.mts";
import { profileSelectRepository } from "../newConfig/dbClient.mts";
import express from "express";

// Router might need to be renamed at some point
const router = express.Router();

// Potential global authentication function sequence for profile routes
/*
router.all('{*splat}', requireAuthentication)
router.all('{*splat}', loadUser)
*/

router.get("/profile/:id", async (request, response) => {
  try {
    const profilesById = parseProfiles(
      profileSelectRepository.selectById.bind(profileSelectRepository),
      "all",
      request.params.id
    );
    return profilesById;
  } catch (e) {
    //
  }
});

router.get("/tournamentprofile/:id", async (request, response) => {
  try {
    const profilesById = parseProfiles(
      profileSelectRepository.selectById.bind(profileSelectRepository),
      "tournament",
      request.params.id
    );
    return profilesById;
  } catch (e) {
    //
  }
});

router.get("/cashprofile/:id", async (request, response) => {
  try {
    const profilesById = parseProfiles(
      profileSelectRepository.selectById.bind(profileSelectRepository),
      "cash",
      request.params.id
    );
    return profilesById;
  } catch (e) {
    //
  }
});

router.post("/tournamentprofile/:id", async (request, response) => {
  try {
    //
  } catch (e) {
    //
  }
});

// HTTP PATCH is used to update the entity, PUT replaces it entirely
// Using PUT like PATCH would need the entire entity to be sent regardless of how much of it is altered
// PATCH requires only the alterations
router.patch("/profile/:id", async (request, response) => {
  try {
    //
  } catch (e) {
    //
  }
});

router.delete("/profile/:id", async (request, response) => {
  try {
    //
  } catch (e) {
    //
  }
});

export default router;

// What about users?
