import * as React from "react";

interface EmailTemplateProps {
  abuserName: string;
  abuserEmail: string;
  abuserUserId: string;
  comment: string;
  reporterName: string | undefined;
  reporterEmail: string | undefined;
  behaviour: string;
}

export const ReportAbuseEmailTemplate = ({
  abuserName,
  abuserEmail,
  abuserUserId,
  comment,
  reporterName,
  reporterEmail,
  behaviour,
}: EmailTemplateProps) => (
  <div className="flex flex-col justify-center items-center">
    <h4>New abuse report details below:</h4>
    <p>Person reporting abuse: {reporterName}</p>
    <p>Email person reporting abuse: {reporterEmail}</p>
    <p>Person being reported: {abuserName}</p>
    <p>Email Person being reported: {abuserEmail}</p>
    <p>UserId Person being reported: {abuserUserId}</p>
    <p>Comment being reported: {comment}</p>
    <p>Behaviour: {behaviour}</p>
  </div>
);
