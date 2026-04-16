const Application = require("../models/Application");
const { applicationStatuses, validStatusTransitions } = require("../config/constants");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");

const listApplications = asyncHandler(async (req, res) => {
  const { studentId, status } = req.query;
  const filters = {};

  if (studentId) {
    filters.student = studentId;
  }

  if (status) {
    filters.status = status;
  }

  const applications = await Application.find(filters)
    .populate("student", "fullName email role")
    .populate("program", "title degreeLevel tuitionFeeUsd")
    .populate("university", "name country city")
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: applications,
  });
});

const createApplication = asyncHandler(async (req, res) => {
  const { studentId, programId, universityId, destinationCountry, intake } = req.body;

  if (!studentId || !programId || !universityId || !destinationCountry || !intake) {
    throw new HttpError(400, "Please provide all required application fields.");
  }

  // Prevent duplicate applications for the same student + program + intake
  const existingApp = await Application.findOne({ student: studentId, program: programId, intake });
  if (existingApp) {
    throw new HttpError(409, "An application for this program and intake already exists.");
  }

  const application = await Application.create({
    student: studentId,
    program: programId,
    university: universityId,
    destinationCountry,
    intake,
    status: "submitted",
    timeline: [{ status: "submitted", note: "Application submitted.", changedAt: new Date() }],
  });

  res.status(201).json({
    success: true,
    data: application,
  });
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  if (!status) {
    throw new HttpError(400, "Please provide a status.");
  }

  if (!applicationStatuses.includes(status)) {
    throw new HttpError(400, `Invalid status. Must be one of: ${applicationStatuses.join(", ")}`);
  }

  const application = await Application.findById(id);
  if (!application) {
    throw new HttpError(404, "Application not found.");
  }

  // Enforce valid status transitions using the transition map
  const allowedNextStatuses = validStatusTransitions[application.status] || [];
  if (!allowedNextStatuses.includes(status)) {
    throw new HttpError(
      400,
      `Cannot transition from "${application.status}" to "${status}". Allowed transitions: ${allowedNextStatuses.join(", ") || "none (final state)"}.`
    );
  }

  application.status = status;
  application.timeline.push({
    status,
    note: note || `Status changed to ${status}.`,
    changedAt: new Date(),
  });

  await application.save();

  res.json({
    success: true,
    data: application,
  });
});

module.exports = {
  createApplication,
  listApplications,
  updateApplicationStatus,
};
