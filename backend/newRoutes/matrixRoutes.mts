import { parseProfile } from "../newServices/matrixGetServices.mts";
import express from "express";

const router = express.Router();

//Fetches the template set of ranges
router.get("/templates", async (request, response) => {
  try {
    //
  } catch (e) {
    //
  }
});

router.get("/profile/:id", async (request, response) => {
  try {
    //
  } catch (e) {
    //
  }
});

router.post("/profile/:id", async (request, response) => {
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

// What about users?