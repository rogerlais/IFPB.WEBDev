//const domain = 'http://localhost:3000';

const domain = document.location.origin;  //!Possui unica bronca de portas distintas para servidor estático e a parte dinamica

async function create(resource, data) {
  const res = await fetch(`${domain}${resource}`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  domain
  return await res.json();
}

async function read(resource) {
  const res = await fetch(`${domain}${resource}`);

  return await res.json();
}

async function update(resource, data) {
  const res = await fetch(`${domain}${resource}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  return await res.json();
}

async function destroy(resource) {
  await fetch(`${domain}${resource}`, {
    method: 'delete',
  });
}

export default { create, read, update, destroy };
