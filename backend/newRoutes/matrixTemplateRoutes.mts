import { parseTemplates } from "../newServices/matrixGetServices.mts";
import { profileSelectRepository } from "../newConfig/dbClient.mts";
import express from "express";

// Router might need to be renamed at some point
const router = express.Router();

//Fetches the template set of ranges
router.get("/templates", async (request, response) => {
  try {
    const allTemplates = parseTemplates(
      profileSelectRepository.selectTemplates.bind(profileSelectRepository),
      "all"
    );
    return allTemplates;
  } catch (e) {
    //
  }
});

router.get("/tournamenttemplates", async (request, response) => {
  try {
    const tournamentTemplates = parseTemplates(
      profileSelectRepository.selectTemplates.bind(profileSelectRepository),
      "tournament"
    );
    return tournamentTemplates;
  } catch (e) {
    //
  }
});

router.get("/cashtemplates", async (request, response) => {
  try {
    const cashTemplates = parseTemplates(
      profileSelectRepository.selectTemplates.bind(profileSelectRepository),
      "cash"
    );
    return cashTemplates;
  } catch (e) {
    //
  }
});

export default router;
