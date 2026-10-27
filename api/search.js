export default async function handler(req, res) {
  try {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).json({
        error: "Image URL is required"
      });
    }

    const apiKey = process.env.SEARCHAPI_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "SEARCHAPI_KEY is not configured"
      });
    }

    const apiUrl = new URL(
      "https://www.searchapi.io/api/v1/search"
    );

    apiUrl.searchParams.set(
      "engine",
      "google_reverse_image"
    );

    apiUrl.searchParams.set(
      "url",
      imageUrl
    );

    apiUrl.searchParams.set(
      "api_key",
      apiKey
    );

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "TraceLens search failed"
    });
  }
}
