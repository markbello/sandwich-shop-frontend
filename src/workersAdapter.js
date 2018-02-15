const WorkersAdapter = (function(){
  return class WorkersAdapter {

    static getAllWorkers(){
      return fetch('http://localhost:3000/api/v1/workers')
      .then(res => res.json())
    }

    static getWorker(id){
      return fetch('http://localhost:3000/api/v1/workers/' + id)
      .then(res => res.json())
    }

    // static updateWorker(id, sandwiches, quantity, cost){
    static updateWorker(worker){
      return fetch('http://localhost:3000/api/v1/workers/' + worker.id,{
        method: 'PATCH',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sandwiches_per_second_modifier: worker.sandwiches_per_second_modifier,
          quantity: worker.quantity,
          cost: worker.cost
        })
      })
      .then(res => res.json())
    }

  }
})()
