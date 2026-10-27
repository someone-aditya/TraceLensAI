export default async (req) => {
  try {
    const url = new URL(req.url);
    const imageUrl = url.searchParams.get("url");

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: "Image URL is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const apiKey = Netlify.env.get("SEARCHAPI_KEY");

    const apiUrl = new URL("https://www.searchapi.io/api/v1/search");
    apiUrl.searchParams.set("engine", "google_reverse_image");
    apiUrl.searchParams.set("url", imageUrl);
    apiUrl.searchParams.set("api_key", apiKey);

    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "TraceLens search failed"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
