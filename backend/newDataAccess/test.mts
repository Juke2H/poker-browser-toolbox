import { profileSelectRepository } from "../newConfig/dbClient.mts";
import {
  parseProfiles,
  parseTemplates,
} from "../newServices/matrixGetServices.mts";

// Test file for database functions
// ROW LEVEL SECURITY prevents anon key selects currently
// rangeProfileRepository.fetchById(process.env.TEST_PROFILEID)
// rangeProfileRepository.fetchWithCombos(process.env.TEST_PROFILEID)
// rangeProfileRepository.fetchAllTemplates()
// Callbacks or parameter functions need to bind the class to get access to the class's "this"
// ParseTemplates is the class function, selectTemplates which binds the profileSelect class is templateFunc and "tournament" is gameType
parseTemplates(
  profileSelectRepository.selectTemplates.bind(profileSelectRepository),
  "tournament"
);
