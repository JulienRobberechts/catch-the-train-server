const request = require("supertest");
const app = require("../app");
const api = request(app);
const debug = require("debug")("ctt:test");

describe("GET /", () => {
  it("should return ping response", async () => {
    const response = await api.get("/").expect(200);
    expect(response.body.status).toBe("ok");
  });

  it("should return an error in async requests", async () => {
    const response = await api.get("/error-async").expect(500);
    expect(response.body.errorType).toBe("Error");
    expect(response.body.errorMessage).toBe("Erreur serveur inconnue");
    // TODO: add check to get 'sample synchronous error message'
  });

  it("should return an error in sync requests", async () => {
    const response = await api.get("/error-sync").expect(500);
    expect(response.body.errorType).toBe("Error");
    expect(response.body.errorMessage).toBe("Erreur serveur inconnue");
    // TODO: add check to get 'sample synchronous error message'
  });

  it("should return an validation error response", async () => {
    const response = await api.get("/error-validation").expect(400);
    expect(response.body.errorType).toBe("ValidationError");
    expect(response.body.errorMessage).toBe("sample validation error message");
  });

  it("should return an server error response", async () => {
    const response = await api.get("/error-server-unavailable").expect(503);
    expect(response.body.errorType).toBe("Error");
    expect(response.body.errorMessage).toBe(
      "Le service externe est momentanément indisponible"
    );
  });
});
