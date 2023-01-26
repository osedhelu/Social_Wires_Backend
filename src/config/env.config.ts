export const EnvConfigutation = () => ({
  enviroment: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3004,
  default_limit: process.env.DEFAULT_LIMIT || 7,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || "",
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "",
});
