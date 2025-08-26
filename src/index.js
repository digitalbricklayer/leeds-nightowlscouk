export default {
  async fetch(request) {
    const externalHostname = "leedsnightowls.com";

    const redirectMap = new Map([
      ["/", "https://" + externalHostname + "/"],
      ["/bulk2", "https://" + externalHostname + "/redirect3"],
      ["/bulk3", "https://" + externalHostname + "/redirect4"],
      ["/bulk4", "https://google.com"],
    ]);

    const requestURL = new URL(request.url);
    const path = requestURL.pathname;
    const location = redirectMap.get(path);

    if (location) {
      return Response.redirect(location, 301);
    }
    // If request not in map, return the original request
    return fetch(request);
  },
};
