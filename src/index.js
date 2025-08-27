export default {
  async fetch(request) {
    const externalHostname = "leedsnightowls.com";

    // The old CMS system had pages as root with the page_id query parameter
    const pageIdMap = new Map([
      ["25", "https://" + externalHostname + "/gallery/"],
      ["297", "https://" + externalHostname + "/events/"],
      ["18", "https://" + externalHostname + "/meetings/"],
    ]);
    
    const redirectMap = new Map([
      ["/", "https://" + externalHostname + "/"],
      ["/forums/index.php", "https://" + externalHostname + "/"],
      ["/forums", "https://" + externalHostname + "/"],
    ]);

    const requestURL = new URL(request.url);
    const path = requestURL.pathname;

    // Redirect old CMS page requests
    if (path == "/") {
      const page_id = requestURL.searchParams.get("page_id");
      const page_id_redirect = pageIdMap.get(page_id);
      if (page_id_redirect) {
        return Response.redirect(page_id_redirect, 301);
      }
    }

    // Redirect pages
    const location = redirectMap.get(path);

    if (location) {
      return Response.redirect(location, 301);
    }

    const wordPressPageMap = ["/wp-admin", "/wp-content"];
    
    // Requests to the old WordPress site should return a 404 status code
    for (let i = 0; i < wordPressPageMap.length(); i++) {
      if (path.startsWith(wordPressPageMap[i]) {
        const notFoundParts = ['404 Not Found'];
        const notFoundBlob = new Blob(notFoundParts, { type: "text/plain" });
        return new Response(notFoundBlob, { status: 404, statusText: "404 Not Found" });
      }
    }
    
    // Redirect request as is except to new website
    const default_redirect = request.url.replace("leeds-nightowls.co.uk", externalHostname);
    return Response.redirect(default_redirect, 301);
  },
};
