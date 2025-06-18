import { rangeProfileRepository } from "../newConfig/dbClient.mts";
import { parseProfile, parseTemplates } from "../newServices/matrixServices.mts";

// Test file for database functions
// ROW LEVEL SECURITY prevents anon key selects currently
// rangeProfileRepository.fetchById(process.env.TEST_PROFILEID)
// rangeProfileRepository.fetchWithCombos(process.env.TEST_PROFILEID)
// rangeProfileRepository.fetchAllTemplates()
parseTemplates();