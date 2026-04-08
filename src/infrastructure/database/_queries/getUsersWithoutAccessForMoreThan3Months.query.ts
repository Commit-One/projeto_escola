export const getUsersWithoutAccessForMoreThan3MonthsQuery = `
  SELECT *
  FROM users
WHERE last_access < NOW() - INTERVAL '3 months'
`;
