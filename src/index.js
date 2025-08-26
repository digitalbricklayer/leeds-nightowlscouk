export default {
  async fetch(request) {
    const externalHostname = "leedsnightowls.com";

    // the page_id query refers to an old pages
    const pageIdMap = new Map([
      ["25", "https://" + externalHostname + "/gallery/"],
      ["297", "https://" + externalHostname + "/events/"],
    ]);
    
    const redirectMap = new Map([
      ["/", "https://" + externalHostname + "/"],
    ]);

    const requestURL = new URL(request.url);
    const path = requestURL.pathname;

    // Redirect old page requests
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
    
    // If request not in map, return the original request
    return fetch(request);
  },
};
