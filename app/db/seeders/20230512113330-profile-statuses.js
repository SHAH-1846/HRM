'use strict';

module.exports = {
  up: (models, mongoose) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:
    return models.profile_statuses
      .insertMany([
        {
          _id: "645e25247483b6558146f827",
          profile_statuse: "Active",
        },
        {
          _id: "645e25317483b6558146f828",
          profile_statuse: "Inactive",
        },
      ])
      .then((res) => {
        // Prints "1"
        console.log(res.insertedCount);
      });
  },

  down: (models, mongoose) => {
    // Add reverting commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:
    return models.profile_statuses
      .deleteMany({
        _id: {
          $in: ["645e25247483b6558146f827", "645e25317483b6558146f828"],
        },
      })
      .then((res) => {
        // Prints "1"
        console.log(res.deletedCount);
      });
  },
};
