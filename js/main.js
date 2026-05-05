class TabelaIP {

  constructor() {
    this.tbody = document.querySelector('#iptable tbody')
    this.form = document.querySelector('#add-ip')
    this.inputs = [...this.form.querySelectorAll('input')]
    
    const btn = document.querySelector('button')
    this.initAddEvent(btn)

    this.loadTableEvents()
  }

  ipExiste(ip) {
    return !!this.tbody.querySelector(`tr[data-ip="${ip}"]`)
  }

  criarLinha(dados) {
    const html = `
      <tr data-ip="${dados.ip}">
        <td class="ip">${dados.ip}</td>
        <td class="mask">${dados.mask}</td>
        <td class="version">${dados.version}</td>
        <td>
          <button class="edit">Editar</button>
          <button class="delete">Excluir</button>
        </td>
      </tr>
    `

    this.tbody.insertAdjacentHTML('afterbegin', html)
  }

  initAddEvent(botao) {
    botao.addEventListener('click', (e) => {
      e.preventDefault()

      const data = new FormData(this.form)

      const novoIP = {
        ip: data.get('ip') || '-',
        mask: data.get('mask') || '-',
        version: data.get('version') || '-'
      }

      if (this.ipExiste(novoIP.ip)) {
        alert('Esse IP já foi cadastrado!')
        return
      }

      this.criarLinha(novoIP)
      this.inputs.forEach(i => i.value = '')
      botao.blur()
    })
  }

  loadTableEvents() {
    this.tbody.addEventListener('click', (e) => {
      const row = e.target.closest('tr')
      if (!row) return

      const ipAtual = row.dataset.ip

      if (e.target.classList.contains('delete')) {
        row.remove()
      }

      if (e.target.classList.contains('edit')) {
        const novoIP = prompt('Novo IP:', ipAtual)
        const novaMask = prompt('Nova máscara:', row.querySelector('.mask').textContent)
        const novaVersion = prompt('Nova versão:', row.querySelector('.version').textContent)

        if (!novoIP) return

        if (novoIP !== ipAtual && this.ipExiste(novoIP)) {
          alert('Esse IP já existe!')
          return
        }

        row.dataset.ip = novoIP
        row.querySelector('.ip').textContent = novoIP
        row.querySelector('.mask').textContent = novaMask || '-'
        row.querySelector('.version').textContent = novaVersion || '-'
      }
    })
  }

}

const tabela = new TabelaIP()