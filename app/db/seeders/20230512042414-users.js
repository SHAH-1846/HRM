'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return models.users
        .insertMany([
          {
            _id: "645e3a777483b6558146f854",

            personel_details: {
              first_name: "John",
              last_name: "Doe",
              short_name: "Miky",
              image: "uploads/users/user_image.jpg",
              gender: "Male",
              phone: "1234567890",
              personel_email: "john@gmail.com",
              emergency_contact: "9874563210",
              pan: "HC123",
              blood_group_id: "A+",
            },

            contact_details: {
              current_address: {
                address: "2483 Boundary Street Jacksonville, FL 32202",
                country: "United States",
                state: "California",
                pincode: "32202",
              },

              permanent_address: {
                address: "2483 Boundary Street Jacksonville, FL 32202",
                country: "United States",
                state: "California",
                pincode: "32202",
              },
            },

            official_details: {
              employee_code: "1234",
              job_title: "Senior Developer",
              department: "645e18097483b6558146f81e",
              employee_type_id: "645e1fcdb92bb17740482c2a",
              profile_status_id: "645e25247483b6558146f827",
              official_email: "johnofficial@gmail.com",
              date_of_join: "12-05-2023",
              profile_privacy: {
                private: false,
                public: true,
              },
            },

            account_details: [
              {
                bank_name: "Goldman Sachs",
                account_no: "123456789",
                ifsc: "1234",
                branch_name: "New York",
                account_holder: "John Doe",
              },

              {
                bank_name: "JPMorgan Chase",
                account_no: "987456123",
                ifsc: "9874",
                branch_name: "New York",
                account_holder: "John Doe",
              },
            ],

            salary: [
              {
                label: "Basic salary",
                value: "50000",
              },
              {
                label: "House rent allowance",
                value: "10000",
              },
              {
                label: "Conveyance",
                value: "5000",
              },
              {
                label: "Medical allowance",
                value: "5000",
              },
            ],

            skills: [
              {
                skill: "nodejs",
              },
              {
                skill: "mongodb",
              },
              {
                skill: "express",
              },
              {
                skill: "react",
              },
            ],

            email: "johnofficial@gmail.com",
            password: "$2a$12$1IXd0lNkaA.sHAgzRC9KtePaK4wdOFug6trjUSOooKySyFOYT39rW", //John#123, John@123
            last_login: "12-05-2023",
            password_token: "string",
            user_type_id: "645e348b7483b6558146f845"
          },

          {
            _id: "645e3a987483b6558146f855",

            personel_details: {
              first_name: "James",
              last_name: "Doe",
              short_name: "Michle",
              image: "uploads/users/user_image.jpg",
              gender: "Male",
              phone: "1234567890",
              personel_email: "james@gmail.com",
              emergency_contact: "9874563210",
              pan: "HC123",
              blood_group_id: "A+",
            },

            contact_details: {
              current_address: {
                address: "2483 Boundary Street Jacksonville, FL 32202",
                country: "United States",
                state: "California",
                pincode: "32202",
              },

              permanent_address: {
                address: "2483 Boundary Street Jacksonville, FL 32202",
                country: "United States",
                state: "California",
                pincode: "32202",
              },
            },

            official_details: {
              employee_code: "1234",
              job_title: "Manager",
              department: "645e183a7483b6558146f820",
              employee_type_id: "645e1fcdb92bb17740482c2a",
              profile_status_id: "645e25247483b6558146f827",
              official_email: "jamesofficial@gmail.com",
              date_of_join: "12-05-2023",
              profile_privacy: {
                private: false,
                public: true,
              },
            },

            account_details: [
              {
                bank_name: "Goldman Sachs",
                account_no: "123456789",
                ifsc: "1234",
                branch_name: "New York",
                account_holder: "James Doe",
              },

              {
                bank_name: "JPMorgan Chase",
                account_no: "987456123",
                ifsc: "9874",
                branch_name: "New York",
                account_holder: "James Doe",
              },
            ],

            salary: [
              {
                label: "Basic salary",
                value: "50000",
              },
              {
                label: "House rent allowance",
                value: "10000",
              },
              {
                label: "Conveyance",
                value: "5000",
              },
              {
                label: "Medical allowance",
                value: "5000",
              },
            ],

            skills: [
              {
                skill: "leadership",
              },
              {
                skill: "communication",
              },
              {
                skill: "problem solving",
              },
              {
                skill: "decision making",
              },
            ],

            email: "jamesofficial@gmail.com",
            password: "$2a$12$cxfuPWHObypHGtRzBm7QQeLpQK97jM4NgLrJTRzn8PGHG.JxdZfr2", //James#123
            last_login: "12-05-2023",
            password_token: "string",
            user_type_id: "645e34807483b6558146f844"
          },

          {
            _id: "645e3aab7483b6558146f856",

            personel_details: {
              first_name: "Jane",
              last_name: "Doe",
              short_name: "Rocky",
              image: "uploads/users/user_image.jpg",
              gender: "Male",
              phone: "1234567890",
              personel_email: "jane@gmail.com",
              emergency_contact: "9874563210",
              pan: "HC123",
              blood_group_id: "A+",
            },

            contact_details: {
              current_address: {
                address: "2483 Boundary Street Jacksonville, FL 32202",
                country: "United States",
                state: "California",
                pincode: "32202",
              },

              permanent_address: {
                address: "2483 Boundary Street Jacksonville, FL 32202",
                country: "United States",
                state: "California",
                pincode: "32202",
              },
            },

            official_details: {
              employee_code: "1234",
              job_title: "Admin",
              department: "645e182c7483b6558146f81f",
              employee_type_id: "645e1fcdb92bb17740482c2d",
              profile_status_id: "645e25247483b6558146f827",
              official_email: "janeofficial@gmail.com",
              date_of_join: "12-05-2023",
              profile_privacy: {
                private: false,
                public: true,
              },
            },

            account_details: [
              {
                bank_name: "Goldman Sachs",
                account_no: "123456789",
                ifsc: "1234",
                branch_name: "New York",
                account_holder: "Jane Doe",
              },

              {
                bank_name: "JPMorgan Chase",
                account_no: "987456123",
                ifsc: "9874",
                branch_name: "New York",
                account_holder: "Jane Doe",
              },
            ],

            salary: [
              {
                label: "Basic salary",
                value: "50000",
              },
              {
                label: "House rent allowance",
                value: "10000",
              },
              {
                label: "Conveyance",
                value: "5000",
              },
              {
                label: "Medical allowance",
                value: "5000",
              },
            ],

            skills: [
              {
                skill: "problem solving",
              },
              {
                skill: "entrepreneurship",
              },
              {
                skill: "multitasking",
              },
              {
                skill: "resource management",
              },
            ],

            email: "janeofficial@gmail.com",
            password: "$2a$12$HjMPUI45OAyePe/sw8Jt7ebM7cekQoSULQpik1sqrKnXYCDorQO9S", //Jane#123
            last_login: "12-05-2023",
            password_token: "string",
            user_type_id: "645e348b7483b6558146f845"
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
      return models.users.deleteMany(
        {
          _id: {
            $in: [
              "645e3a777483b6558146f854",
              "645e3a987483b6558146f855",
              "645e3aab7483b6558146f856",
            ],
          },
        }
      ).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
