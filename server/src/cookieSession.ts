import cookieSession from "cookie-session";

export const cookieSessionMiddleware = cookieSession({
  name: "session",
  secret: "asdkhl847sglkj374hj39sglk5j7",
  maxAge: 1 * 60 * 60 * 1000 * 24 * 7, // 1 hour
  secure: false,
  httpOnly: true,
});
