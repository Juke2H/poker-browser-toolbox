import { parseTemplates } from "../newServices/matrixGetServices.mts";
import { parseTemplateInsert } from "../newServices/matrixPostServices.mts";
import { parseTemplateUpdate } from "../newServices/matrixPatchServices.mts";
import { parseTemplateDelete } from "../newServices/matrixDeleteServices.mts";
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
    response.status(200).send(allTemplates); // OK
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
    response.status(200).send(tournamentTemplates);
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
    response.status(200).send(cashTemplates);
  } catch (error) {
    next(error);
  }
});

// Post, patch and delete requests are most likely seldom used,
// and should most likely not be accessible in front-end.

//???add a response to all
router.post("/alltemplates", async (request, response, next) => {
  const createdProfile = request.body;

  try {
    const result = await parseTemplateInsert(
      profileRepository.insert.insertTemplate.bind(profileRepository.insert),
      createdProfile
    );

    response
      .status(201) // CREATED
      .json({ message: "Profile created successfully", profile: result });
  } catch (error) {
    next(error);
  }
});

router.patch("/alltemplates/:id", async (request, response, next) => {
  const profileId = request.params.id;
  const updatedProfile = request.body;

  try {
    const result = await parseTemplateUpdate(
      profileRepository.update.updateTemplate.bind(profileRepository.update),
      updatedProfile,
      profileId
    );

    response.status(200).json({
      message: `Profile ${profileId} updated successfully`,
      profile: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/alltemplates/:id", async (request, response, next) => {
  const profileId = request.params.id;

  try {
    await parseTemplateDelete(
      profileRepository.delete.deleteTemplate.bind(profileRepository.delete),
      profileId
    );

    response.status(204).send(); // NO CONTENT
  } catch (error) {
    next(error);
  }
});

export default router;
