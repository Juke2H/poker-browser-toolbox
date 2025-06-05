// The service class is supposed to be written in a way that I can use mock data to test the functions.
// Ie. receive data, return result
// This return can then be sent to the db or frontend depending.

//The frontend currently does CRUD operations with the following form structure:
//Initially this service layer should manipulate the data from this to something the db can receive, or from db into this.
/*  interface Profile {
    _id?: string;
    profilename: string;
    range: {
      call: string[];
      raise: string[];
    };
    description: string;
    type: string;
    stack: string;
  } */

    //Note to self, this doesn't include game type (cash, mtt)
    //The database doesn't differentiate either so I need to recreate the db at some point
    //The raw data does have game types, however, so it shouldn't be too difficult