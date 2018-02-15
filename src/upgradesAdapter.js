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

    static updateUpgrade(upgrade){
      return fetch('http://localhost:3000/api/v1/workers/' + upgrade.id,{
        method: 'PATCH',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sandwiches_per_second_modifier: upgrade.sandwiches_per_second_modifier,
          cost: upgrade.cost
        })
      })
      .then(res => res.json())
    }

    static deleteUpgrade(id){
      return fetch('http://localhost:3000/api/v1/upgrades/' + id, {
        method: "DELETE"
      })
    }
  }
})()
