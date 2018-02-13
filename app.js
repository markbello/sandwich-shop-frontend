const App = (function(){
  let workerObjects = [
    {'id': 1, 'name': 'Recent College Graduate', 'sandwiches': 1, 'quantity': 0, 'cost': 10, 'interval':4000},
    {'id': 2, 'name': 'Mother', 'sandwiches': 2, 'quantity': 0, 'cost': 20, 'interval':1500},
    {'id': 3, 'name': 'Sandwich Shop', 'sandwiches': 4, 'quantity': 0, 'cost': 30, 'interval':2000}
  ]

  let upgradeObjects = [
    {'name': 'Pay Raise', 'multiplier': 2, 'cost': 10, 'user':'Recent College Graduate'},
    {'name': 'Return Phone Calls', 'multiplier': 4, 'cost': 100, 'user':'Mother'}
  ]

  return class App {
    static init(){
      console.log('loaded')

      setInterval(function(){
        document.querySelector('title').innerText = document.getElementById('money-count').innerText}, 2000)

      let img = document.getElementById('image')
      let moneyCount = document.getElementById('money-count')

      img.addEventListener('click', function(){
        moneyCount.innerText = parseInt(moneyCount.innerText) + 1
      })

      let workersDiv = document.getElementById('workers')

      for(let el of workerObjects){
        console.log(el)
        let h4 = document.createElement('h4')

        h4.innerText = `${el['name']} | ${el['quantity']} | $${el['cost']} | Sandwiches per Unit: ${el['sandwiches']}`
        h4.id = el['id']

        h4.addEventListener('click', function(){
          //Test if cost is less than available money
          if(el['cost'] <= parseInt(moneyCount.innerText)){
            //Deducts the worker cost from the available money
            moneyCount.innerText = parseInt(moneyCount.innerText) - el['cost']
            //Adds a worker and increases the cost
            el['quantity'] += 1;
            el['cost'] += Math.floor(el['cost'] * 0.2)
            //Finalizes our Li element
            h4.innerText = `${el['name']} | ${el['quantity']} | $${el['cost']} | Sandwiches per Unit: ${el['sandwiches']}`
          }
          //Checks if we have the worker
          if(el['quantity'] > 0){
            //Makes the worker work
            setInterval(function(){
              moneyCount.innerText = parseInt(moneyCount.innerText) + el['sandwiches']
            },el['interval'])
          }
        })
        workersDiv.append(h4)
      }

      let upgradesDiv = document.getElementById('upgrades')

      for(let el of upgradeObjects){
        console.log(el)
        let upgradeH4 = document.createElement('h4')
        upgradeH4.innerText = `${el['name']} | $${el['cost']} | For: ${el['user']}`

        upgradeH4.addEventListener('click',function(){
          if(el['cost'] <= parseInt(moneyCount.innerText)){
            moneyCount.innerText = parseInt(moneyCount.innerText) - el['cost']
            upgradeH4.remove()
            let worker = workerObjects.find(workerObj => {
              return workerObj['name'] === el['user']

            })
            worker['sandwiches'] *= el['multiplier']
            let upgradedDiv = document.getElementById(worker['id'])
            upgradedDiv.innerText = `${worker['name']} | ${worker['quantity']} | $${worker['cost']} | Sandwiches per Unit: ${worker['sandwiches']}`
            console.log(worker)
            console.log(workerObjects)
          }
        })


        upgradesDiv.append(upgradeH4)

      }
    }

  }
})()
