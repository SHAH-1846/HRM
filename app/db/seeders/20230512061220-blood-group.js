'use strict';

module.exports = {
  up: (models, mongoose) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:
    return models.blood_groups
      .insertMany([
        {
          _id: "645deab47483b6558146f7fc",
          blood_group: "A+",
        },
        {
          _id: "645dead97483b6558146f7fd",
          blood_group: "A-",
        },
        {
          _id: "645deae77483b6558146f7fe",
          blood_group: "B+",
        },
        {
          _id: "645deaf77483b6558146f7ff",
          blood_group: "B-",
        },
        {
          _id: "645deb1f7483b6558146f802",
          blood_group: "O+",
        },
        {
          _id: "645deb4b7483b6558146f803",
          blood_group: "O-",
        },
        {
          _id: "645deb5f7483b6558146f804",
          blood_group: "AB+",
        },
        {
          _id: "645deb727483b6558146f805",
          blood_group: "AB-",
        },
      ])
      .then((res) => {
        // Prints "1"
        console.log("Blood group seeding successful");
        console.log(res.insertedCount);
      });
  },

  down: (models, mongoose) => {
    // Add reverting commands here.
    // Return a promise to correctly handle asynchronicity.

    // Example:
    return models.blood_groups
      .deleteMany({
        _id: {
          $in: [
            "645deab47483b6558146f7fc",
            "645dead97483b6558146f7fd",
            "645deae77483b6558146f7fe",
            "645deaf77483b6558146f7ff",
            "645deb1f7483b6558146f802",
            "645deb4b7483b6558146f803",
            "645deb5f7483b6558146f804",
            "645deb727483b6558146f805",
          ],
        },
      })
      .then((res) => {
        // Prints "1"
        console.log(res.deletedCount);
      });
  },
};