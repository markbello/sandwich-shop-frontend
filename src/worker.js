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
      workersDiv.className = "worker-div"

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

        let workerNameSpan = document.createElement('span')
        workerNameSpan.id = `worker-${worker.id}-name`
        workerNameSpan.className = `item-data`
        workerNameSpan.innerText = worker.name
        workerDiv.append(workerNameSpan)

        let quantityLabel = document.createElement('span')
        quantityLabel.className = "item-label"
        quantityLabel.innerText = " | Quantity: "
        workerDiv.append(quantityLabel)

        let workerQuantitySpan = document.createElement('span')
        workerQuantitySpan.id = `worker-${worker.id}-quantity`
        workerQuantitySpan.className = 'item-data'
        workerQuantitySpan.innerText = worker.quantity
        workerDiv.append(workerQuantitySpan)

        let costLabel = document.createElement('span')
        costLabel.className = "item-label"
        costLabel.innerText = " | Unit Cost: "
        workerDiv.append(costLabel)

        let workerCostSpan = document.createElement('span')
        workerCostSpan.id = `worker-${worker.id}-cost`
        workerCostSpan.className = 'item-data'
        workerCostSpan.innerText = worker.cost
        workerDiv.append(workerCostSpan)

        let sandWichesPerSecondLabel = document.createElement('span')
        sandWichesPerSecondLabel.className = "item-label"
        sandWichesPerSecondLabel.innerText = " | Sandwiches Per Second Modifier: "
        workerDiv.append(sandWichesPerSecondLabel)

        let workerSandwichesPerSecondSpan = document.createElement('span')
        workerSandwichesPerSecondSpan.id = `worker-${worker.id}-sandwiches-per-second`
        workerSandwichesPerSecondSpan.className = 'item-data'
        workerSandwichesPerSecondSpan.innerText = worker.sandwiches_per_second_modifier
        workerDiv.append(workerSandwichesPerSecondSpan)

        let addWorkerButton = document.createElement('button')
        addWorkerButton.innerText = `Hire Another ${worker.name}`

        addWorkerButton.addEventListener('click', function(e){
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

        workerDiv.append(addWorkerButton)

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
      quantityDiv.innerText = json.quantity

      const costDiv = document.getElementById(`worker-${workerId}-cost`)
      costDiv.innerText = json.cost

      const spsDiv = document.getElementById(`worker-${workerId}-sandwiches-per-second`)
      spsDiv.innerText = json.sandwiches_per_second_modifier

    }

    render(){
      console.log('render() is doing a thing')
    }
  }
})()
