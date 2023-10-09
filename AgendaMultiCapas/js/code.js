const API_URL = 'https://www.raydelto.org/agenda.php'

async function submitForm() {
  const name = document.getElementById('name').value
  const lastname = document.getElementById('lastname').value
  const phone = document.getElementById('phone').value

  if (name === '' || lastname === '' || phone === '') {
    alert('Todos los campos son obligatorios')
    return false
  }

  const requestData = {
    nombre: name,
    apellido: lastname,
    telefono: phone,
  }

  await postData(API_URL, requestData)

  document.getElementById('name').value = ''
  document.getElementById('lastname').value = ''
  document.getElementById('phone').value = ''
  
  await loadData()
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify(data),
  })
  alert("Se ha agregado el contacto correctamente")
  return response.json()
}

async function loadData() {
  const data = await getData(API_URL)
  const table = document.getElementById('tableData')
  table.innerHTML = ''
  data.forEach((item) => {
    table.innerHTML += `<tr>
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>${item.telefono}</td>
    </tr>`
  })
}

async function getData(url = '') {
  const response = await fetch(url)
  return await response.json()
}

loadData()
