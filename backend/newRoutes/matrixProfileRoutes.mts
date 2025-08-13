import { parseProfiles } from "../newServices/matrixGetServices.mts";
import { profileSelectRepository } from "../newConfig/dbClient.mts";
import express from "express";

// Router might need to be renamed at some point
const router = express.Router();

// Potential global authentication function sequence for profile routes
// router.all('{*splat}', requireAuthentication)
// router.all('{*splat}', loadUser)


router.get("/allprofiles/:id", async (request, response, next) => {
  try {
    const profilesById = await parseProfiles(
      profileSelectRepository.selectById.bind(profileSelectRepository),
      "all",
      request.params.id
    );
    response.send(profilesById);
  } catch (error) {
    next(error); // Next(error) sends the error along to a receiving error handle middleware
  }
});

router.get("/tournamentprofiles/:id", async (request, response, next) => {
  try {
    const profilesById = await parseProfiles(
      profileSelectRepository.selectById.bind(profileSelectRepository),
      "tournament",
      request.params.id
    );
    response.send(profilesById);
  } catch (error) {
    next(error);
  }
});

router.get("/cashprofiles/:id", async (request, response, next) => {
  try {
    const profilesById = await parseProfiles(
      profileSelectRepository.selectById.bind(profileSelectRepository),
      "cash",
      request.params.id
    );
    response.send(profilesById);
  } catch (error) {
    next(error);
  }
});

// This is likely going to be for empty, or newly created, profiles
router.post("/allprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// And these fill out the ranges
// Might want to use PATCH for that, though
router.post("/tournamentprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.post("/cashprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// HTTP PATCH is used to update the entity, PUT replaces it entirely
// Using PUT like PATCH would need the entire entity to be sent regardless of how much of it is altered
// PATCH requires only the alterations
router.patch("/allprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.patch("/tournamentprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.patch("/cashprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Delete entire profile (along with user probably)
router.delete("/allprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Delete tournament ranges
router.delete("/tournamentprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Delete cash ranges
router.delete("/cashprofiles/:id", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

export default router;
