// Global type declarations for Node.js environment
declare namespace NodeJS {
  interface ProcessEnv {
    AZURE_CLIENT_ID?: string;
    CONNECTOR_ID?: string;
    CONNECTOR_NAME?: string;
    CONNECTOR_DESCRIPTION?: string;
    CONNECTOR_ACCESS_TOKEN?: string;
    JSON_API_URL?: string;
    AZURE_FUNCTIONS_ENVIRONMENT?: string;
  }

  interface Global {
    fetch: typeof fetch;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
  }
}
