import helmet from "helmet";
import { Express } from "express";

// Function to initialize helmet with various security headers
const initializeHelmet = (app: Express): Express => {
  // Set various security-related HTTP headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disables the default CSP middleware
    })
  );

  // Set Content Security Policy (CSP)
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    })
  );

  // Set Referrer Policy
  app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

  // Set X-XSS-Protection Policy
  app.use(
    helmet({
      xssFilter: true,
    })
  );

  return app;
};

export { initializeHelmet };
