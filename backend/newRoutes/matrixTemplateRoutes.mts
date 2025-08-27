import { parseTemplates } from "../newServices/matrixGetServices.mts";
import { parseTemplateInsert } from "../newServices/matrixPostServices.mts";
import { profileRepository } from "../newConfig/dbClient.mts";
import express from "express";

// Router might need to be renamed at some point
const router = express.Router();

//Fetches the template set of ranges
router.get("/alltemplates", async (request, response, next) => {
  try {
    const allTemplates = await parseTemplates(
      profileRepository.select.selectTemplates.bind(profileRepository.select),
      "all"
    );
    response.send(allTemplates);
  } catch (error) {
    next(error);
  }
});

router.get("/tournamenttemplates", async (request, response, next) => {
  try {
    const tournamentTemplates = await parseTemplates(
      profileRepository.select.selectTemplates.bind(profileRepository.select),
      "tournament"
    );
    response.send(tournamentTemplates);
  } catch (error) {
    next(error);
  }
});

router.get("/cashtemplates", async (request, response, next) => {
  try {
    const cashTemplates = await parseTemplates(
      profileRepository.select.selectTemplates.bind(profileRepository.select),
      "cash"
    );
    response.send(cashTemplates);
  } catch (error) {
    next(error);
  }
});

// Post, patch and delete requests are most likely seldom used,
// and should most likely not be accessible in front-end.

// Creating a new templates profile shouldn't normally happen, but it's here if it has to
router.post("/alltemplates", async (request, response, next) => {
  try {
    parseTemplateInsert(
      profileRepository.insert.insertTemplate.bind(profileRepository.insert),
      request.body
    );
  } catch (error) {
    next(error);
  }
});

// Needs to be specific id I think
router.patch("/alltemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// Just in case the whole thing needs to be erased
router.delete("/alltemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

// I think it makes sense to separate between all/mtt/cash, but it should also have by-ID delete
router.delete("/tournamenttemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

router.delete("/cashtemplates", async (request, response, next) => {
  try {
    //
  } catch (error) {
    next(error);
  }
});

export default router;
