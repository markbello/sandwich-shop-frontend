const App = (function(){

  return class App {
    static init(){
      console.log('loaded')

      let moneyCount = document.getElementById('money-count')
      let img = document.getElementById('image')
      let workersDiv = document.getElementById('workers')
      // gameInterval = setInterval(function(){
      //   console.log("gameInterval is doing a thing")
      // }, 1000)

      ShopsAdapter.getShop()
      .then(json => {
        console.log(json)
        moneyCount.innerText = json.balance
        setInterval(function(){
          document.querySelector('title').innerText = document.getElementById('money-count').innerText
        }, 2000)
        img.addEventListener('click', function(){
          moneyCount.innerText = parseInt(moneyCount.innerText) + 1
          App.animateSandwich(1, 2800)
        })
        setInterval(function(){
          document.getElementById('money-count').innerText = parseInt(document.getElementById('money-count').innerText) + json.sandwiches_per_second
          let balance = parseInt(document.getElementById('money-count').innerText)
          ShopsAdapter.updateBalance(balance)
        },1000)
      })

      UpgradesAdapter.getAllUpgrades()
      .then(json => console.log(json[1].worker_id))

      WorkersAdapter.getAllWorkers()
      .then(json => {
        Worker.renderAllWorkers(json)
      })


    }
    static animateSandwich(count, interval){

      for(let i = 0; i < count; i++){
        setTimeout(function(){
          let newSandwich = document.createElement('img')
          newSandwich.src = "./assets/sandwich.svg"
          newSandwich.style.height = "100px"
          newSandwich.className = "roadrunner-target"
          document.getElementById('animated-sandwiches').append(newSandwich)
          setInterval(function(){
            newSandwich.remove()
          }, interval)
        }, 100)

      }

    }
  }
})()
