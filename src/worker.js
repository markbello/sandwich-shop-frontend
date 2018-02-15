const Worker = (function(){
  return class Worker {
    constructor({id, name, sandwiches_per_second_modifier, quantity, cost}){
      this.id = id
      this.name = name
      this.sandwiches_per_second_modifier = sandwiches_per_second_modifier
      this.quantity = quantity
      this.cost = cost
    }

    static renderAllWorkers(json){
      const workersDiv = document.getElementById('workers')

      json.sort(function(a,b){
        if(a.id < b.id) return -1
        if(a.id > b.id) return 1
        return 0
      })
      json.forEach(function(workerInstance){
        let counter = document.getElementById('money-count')
        let worker = new Worker(workerInstance)
        let workerDiv = document.createElement('div')
        workerDiv.id = `worker-${worker.id}`
        workerDiv.className = "worker-div"



        let hireDiv = document.createElement('div')
        hireDiv.className = 'hire-container'

        let avatarDiv = document.createElement('div')
        avatarDiv.className = "avatar-div"
        let avatarImg = document.createElement('img')
        avatarImg.className = "avatar-img"
        avatarImg.src = `./assets/worker-${worker.id}-avatar.svg`
        avatarImg.style.width = "100px"
        avatarDiv.append(avatarImg)
        hireDiv.append(avatarDiv)

        let workerHeaders = document.createElement('div')
        workerHeaders.className = "worker-header"

        let addWorkerHeader = document.createElement('h2')
        addWorkerHeader.id = `worker-${worker.id}-cost`
        addWorkerHeader.innerText = `+ $${worker.cost}`

        workerDiv.addEventListener('click', function(e){
          e.stopPropagation()
          if(parseInt(counter.innerText) > worker.cost){
            counter.innerText = parseInt(counter.innerText) - worker.cost
            ShopsAdapter.updateBalance(parseInt(counter.innerText))
            ++worker.quantity
            worker.cost *= 1.2
            WorkersAdapter.updateWorker(worker)
            .then(json => {
              Worker.createNewInterval(json.sandwiches_per_second_modifier)
              Worker.renderUpdatedWorker(json)
              App.animateSandwich(json.sandwiches_per_second_modifier, 2800)
            })
          }
        })

        workerHeaders.append(addWorkerHeader)
        let quantityDiv = document.createElement('div')
        quantityDiv.className = 'item-container'

        // let quantityLabel = document.createElement('span')
        // quantityLabel.className = "item-label"
        // quantityLabel.innerText = "Quantity: "
        // quantityDiv.append(quantityLabel)

        let workerQuantitySpan = document.createElement('h2')
        workerQuantitySpan.id = `worker-${worker.id}-quantity`
        workerQuantitySpan.className = 'item-data'
        workerQuantitySpan.innerText = `${worker.quantity}x`
        workerHeaders.append(workerQuantitySpan)

        hireDiv.append(workerHeaders)
        // workerDiv.append(quantityDiv)

        workerDiv.append(hireDiv)

        let workerNameSpan = document.createElement('h3')
        workerNameSpan.id = `worker-${worker.id}-name`
        workerNameSpan.className = `item-data`
        workerNameSpan.innerText = worker.name
        workerDiv.append(workerNameSpan)





        // let costDiv = document.createElement('div')
        // costDiv.className = 'item-container'
        //
        // let costLabel = document.createElement('span')
        // costLabel.className = "item-label"
        // costLabel.innerText = "Unit Cost: "
        // costDiv.append(costLabel)
        //
        // let workerCostSpan = document.createElement('span')
        // workerCostSpan.id = `worker-${worker.id}-cost`
        // workerCostSpan.className = 'item-data'
        // workerCostSpan.innerText = worker.cost
        // costDiv.append(workerCostSpan)
        //
        // workerDiv.append(costDiv)

        let spsDiv = document.createElement('div')
        spsDiv.className = 'item-container'

        let sandWichesPerSecondLabel = document.createElement('span')
        sandWichesPerSecondLabel.className = "item-label"
        sandWichesPerSecondLabel.innerText = "Sandwiches Per Second: "
        spsDiv.append(sandWichesPerSecondLabel)

        let workerSandwichesPerSecondSpan = document.createElement('span')
        workerSandwichesPerSecondSpan.id = `worker-${worker.id}-sandwiches-per-second`
        workerSandwichesPerSecondSpan.className = 'item-data'
        workerSandwichesPerSecondSpan.innerText = worker.sandwiches_per_second_modifier * worker.quantity
        spsDiv.append(workerSandwichesPerSecondSpan)

        workerDiv.append(spsDiv)

        workersDiv.append(workerDiv)

      })

    }

    static createNewInterval(modifier){
      const counter = document.getElementById('money-count')

      return setInterval(function(){
        counter.innerText = parseInt(counter.innerText) + modifier
      }, 1000)
    }

    static renderUpdatedWorker(json){

      console.log(json)

      const workerId = json.id

      const quantityDiv = document.getElementById(`worker-${workerId}-quantity`)
      quantityDiv.innerText = `${json.quantity}x`

      const costDiv = document.getElementById(`worker-${workerId}-cost`)
      costDiv.innerText = `+ $${json.cost}`

      const spsDiv = document.getElementById(`worker-${workerId}-sandwiches-per-second`)
      spsDiv.innerText = json.sandwiches_per_second_modifier * json.quantity

    }

    static determineWorkerAvailability(json){
      const workers = json.worker_array
      const balance = json.balance
      for(let i = 0; i < workers.length; i++){
        const workerDiv = document.getElementById(`worker-${i+1}`)
        if(workers[i] >= balance){
          workerDiv.classList.remove('available-worker-div')
          workerDiv.classList.add('unavailable-worker-div')
          workerDiv.style.opacity = '0.5'
          workerDiv.classList.add('headShake')
          workerDiv.addEventListener('click', function(){
            workerDiv.classList.toggle('headShake')
          })
        } else{
          workerDiv.style.opacity = "1"
          workerDiv.classList.remove('unavailable-worker-div')
          workerDiv.classList.remove('headShake')
          workerDiv.classList.add('available-worker-div')
        }
      }
    }

    render(){
      console.log('render() is doing a thing')
    }
  }
})()
