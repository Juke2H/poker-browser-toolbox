import { profileSelectRepository } from "../newConfig/dbClient.mts";
import { parseProfile, parseTemplates } from "../newServices/matrixGetServices.mts";

// Test file for database functions
// ROW LEVEL SECURITY prevents anon key selects currently
// rangeProfileRepository.fetchById(process.env.TEST_PROFILEID)
// rangeProfileRepository.fetchWithCombos(process.env.TEST_PROFILEID)
// rangeProfileRepository.fetchAllTemplates()
// Callbacks or parameter functions need to bind the class in order to use "this"
parseTemplates(profileSelectRepository.selectTemplates.bind(profileSelectRepository), "tournament");    