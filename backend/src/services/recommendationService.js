const Program = require("../models/Program");
const Student = require("../models/Student");
const HttpError = require("../utils/httpError");

async function buildProgramRecommendations(studentId) {
  const student = await Student.findById(studentId).lean();

  if (!student) {
    throw new HttpError(404, "Student not found.");
  }

  const targetCountries = student.targetCountries || [];
  const interestedFields = student.interestedFields || [];
  const maxBudget = student.maxBudgetUsd || 0;
  const prefIntake = student.preferredIntake || "";
  const ieltsScore = student.englishTest?.score || 0;

  const pipeline = [
    {
      $match: {
        country: { $in: targetCountries },
      },
    },
    {
      $addFields: {
        matchScore: {
          $add: [
            35,
            {
              $cond: [
                {
                  $gt: [
                    {
                      $size: {
                        $filter: {
                          input: interestedFields,
                          as: "iField",
                          cond: { $eq: ["$$iField", "$field"] }
                        }
                      }
                    },
                    0
                  ]
                },
                30,
                0,
              ],
            },
            {
              $cond: [{ $lte: ["$tuitionFeeUsd", maxBudget] }, 20, 0],
            },
            {
              $cond: [{ $in: [prefIntake, { $ifNull: ["$intakes", []] }] }, 10, 0],
            },
            {
              $cond: [{ $lte: ["$minimumIelts", ieltsScore] }, 5, 0],
            },
          ],
        },
      },
    },
    {
      $sort: { matchScore: -1 },
    },
    {
      $limit: 5,
    },
  ];

  const recommendations = await Program.aggregate(pipeline);

  return {
    data: {
      student: {
        id: student._id,
        fullName: student.fullName,
        targetCountries: student.targetCountries,
        interestedFields: student.interestedFields,
      },
      recommendations,
    },
    meta: {
      implementationStatus: "mongodb-aggregation-complete",
    },
  };
}

module.exports = {
  buildProgramRecommendations,
};
