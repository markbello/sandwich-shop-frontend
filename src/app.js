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

      let resetButton = document.getElementById('reset-button')
      resetButton.addEventListener('click', function(){
        // ShopsAdapter.resetShop()
      })

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
          .then(json => {
            Worker.determineWorkerAvailability(json)
            App.randomImage()
          })
        },1000)
      })

      UpgradesAdapter.getAllUpgrades()
      .then(json => {
        Upgrade.renderAllUpgrades(json)
      })

      WorkersAdapter.getAllWorkers()
      .then(json => {
        Worker.renderAllWorkers(json)
      })


    }

    static randomImage(){
      let randomNumber = Math.floor(Math.random() * 100)
      console.log(`random number is ${randomNumber}`)
      if(randomNumber <= 10){
        setTimeout(function(){
          let newImage = document.createElement('img')
          newImage.src = `./assets/random-${randomNumber}.svg`
          newImage.style.height = "100px"
          newImage.className = "roadrunner-target"
          document.getElementById('animated-sandwiches').append(newImage)
          setInterval(function(){
            newImage.remove()
          }, 2800)
        }, 100)
      }else if(randomNumber >= 90){
        let randomCount = Math.floor(Math.random() * 6)
        App.animateSandwich(randomCount, 2800)
      }

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
