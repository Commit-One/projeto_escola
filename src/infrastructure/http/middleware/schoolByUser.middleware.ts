export const schoolByUserMiddleware = (req: any) => {
  return req.user.escola.uuid;
};
