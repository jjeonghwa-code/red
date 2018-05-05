export default function (...params) {
  return fetch(...params)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    })
    .then(
      response => ({ response }),
      error => ({
        error: error.message || 'Something bad happened',
      })
    );
}
