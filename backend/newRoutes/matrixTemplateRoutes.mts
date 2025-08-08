import { parseTemplates } from "../newServices/matrixGetServices.mts";
import { profileSelectRepository } from "../newConfig/dbClient.mts";
import express from "express";

// Router might need to be renamed at some point
const router = express.Router();

//Fetches the template set of ranges
router.get("/templates", async (request, response, next) => {
  try {
    const allTemplates = parseTemplates(
      profileSelectRepository.selectTemplates.bind(profileSelectRepository),
      "all"
    );
    return allTemplates;
  } catch (error) {
    next(error);
  }
});

router.get("/tournamenttemplates", async (request, response, next) => {
  try {
    const tournamentTemplates = parseTemplates(
      profileSelectRepository.selectTemplates.bind(profileSelectRepository),
      "tournament"
    );
    return tournamentTemplates;
  } catch (error) {
    next(error);
  }
});

router.get("/cashtemplates", async (request, response, next) => {
  try {
    const cashTemplates = parseTemplates(
      profileSelectRepository.selectTemplates.bind(profileSelectRepository),
      "cash"
    );
    return cashTemplates;
  } catch (error) {
    next(error);
  }
});

// Post, patch and delete requests are most likely seldom used,
// and should most likely not be accessible in front-end.

// Creating a new templates profile shouldn't normally happen, but it's here if it has to
router.post("/templates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Redoing the template ranges might happen sometimes, though
router.post("/tournamenttemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.post("/cashtemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Patching non-ranges might happen sometimes.
router.patch("/templates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Patching ranges is going to happen occasionally
router.patch("/tournamenttemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.patch("/cashtemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Just in case the whole thing needs to be erased
router.delete("/templates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.delete("/tournamenttemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.delete("/tournamenttemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

export default router;
