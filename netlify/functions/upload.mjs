export default async (req) => {
  return new Response(
    JSON.stringify({
      error: "Upload service not configured yet"
    }),
    {
      status: 501,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
