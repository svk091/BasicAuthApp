export const baseUrl = String(import.meta.env.VITE_BASIC_AUTH_API_URL);

if (!baseUrl) {
  console.log(import.meta.env.VITE_BASIC_AUTH_API_URL);
  console.log("attikaya");

  throw new Error("API_URL not defined");
}
