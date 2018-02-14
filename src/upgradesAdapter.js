const UpgradesAdapter = (function(){
  return class UpgradesAdapter {

    static getAllUpgrades(){
      return fetch('http://localhost:3000/api/v1/upgrades')
      .then(res => res.json())
    }

    static getUpgrade(id){
      return fetch('http://localhost:3000/api/v1/upgrades/' + id)
      .then(res => res.json())
    }
  }
})()
