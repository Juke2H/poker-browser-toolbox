import { rangeProfileRepository } from "../newConfig/dbClient.mts";

// Test file for database functions
// rangeProfileRepository.fetchById(process.env.TEST_PROFILEID)
rangeProfileRepository.fetchWithCombos(process.env.TEST_PROFILEID)