/* global fetch */
import config from '../config';
export default async function ({ host, path, options = {} }) {
  return fetch(
    `${host || config.HOST}/api${path}`,
    options,
  )
    .then(response =>
      response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        throw json;
      }
      return json;
    });
}
