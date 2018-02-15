const Upgrade = (function(){
  return class Upgrade{
    constructor({id, name, sandwiches_per_second_modifier, cost, worker_cost_modifier}){
      this.id = id
      this.name = name
      this.sandwiches_per_second_modifier = sandwiches_per_second_modifier
      this.cost = cost
      this.worker_cost_modifier = worker_cost_modifier
    }

    static renderAllUpgrades(json){
      const upgradesDiv = document.getElementById('upgrades')
      upgradesDiv.className = "upgrade-div"

      json.sort(function(a,b){
        if(a.id < b.id) return -1
        if(a.id > b.id) return 1
        return 0
      })
      json.forEach(function(upgradeInstance){
        let counter = document.getElementById('money-count')
        let upgrade = new Upgrade(upgradeInstance)
        let upgradeDiv = document.createElement('div')
        upgradeDiv.id = `upgrade-${upgrade.id}`

        let upgradeNameSpan = document.createElement('span')
        upgradeNameSpan.id = `upgrade-${upgrade.id}-name`
        upgradeNameSpan.className = `item-data`
        upgradeNameSpan.innerText = upgrade.name
        upgradeDiv.append(upgradeNameSpan)

        let spsmLabel = document.createElement('span')
        spsmLabel.className = "item-label"
        spsmLabel.innerText = " | Sandwiches Per Second Modifier: "
        upgradeDiv.append(spsmLabel)

        let upgradeSpsmSpan = document.createElement('span')
        upgradeSpsmSpan.id = `upgrade-${upgrade.id}-spsm`
        upgradeSpsmSpan.className = 'item-data'
        upgradeSpsmSpan.innerText = upgrade.sandwiches_per_second_modifier
        upgradeDiv.append(upgradeSpsmSpan)

        let costLabel = document.createElement('span')
        costLabel.className = "item-label"
        costLabel.innerText = " | Upgrade Cost: "
        upgradeDiv.append(costLabel)

        let upgradeCostSpan = document.createElement('span')
        upgradeCostSpan.id = `upgrade-${upgrade.id}-cost`
        upgradeCostSpan.className = 'item-data'
        upgradeCostSpan.innerText = upgrade.cost
        upgradeDiv.append(upgradeCostSpan)

        let workerCostModifierLabel = document.createElement('span')
        workerCostModifierLabel.className = "item-label"
        workerCostModifierLabel.innerText = " | Worker Cost Modifier: "
        upgradeDiv.append(workerCostModifierLabel)

        let upgradeWorkerCostModifier = document.createElement('span')
        upgradeWorkerCostModifier.id = `upgrade-${upgrade.id}-worker-cost-modifier`
        upgradeWorkerCostModifier.className = 'item-data'
        upgradeWorkerCostModifier.innerText = upgrade.worker_cost_modifier
        upgradeDiv.append(upgradeWorkerCostModifier)

        let addUpgradeButton = document.createElement('button')
        addUpgradeButton.innerText = `Purchase ${upgrade.name}`

        addUpgradeButton.addEventListener('click', function(e){
          e.stopPropagation()
          if(parseInt(counter.innerText) > upgrade.cost){
            counter.innerText = parseInt(counter.innerText) - upgrade.cost
            ShopsAdapter.updateBalance(parseInt(counter.innerText))
            upgrade.cost *= 1.2
            UpgradesAdapter.updateUpgrade(upgrade)
            .then(json => {
              Upgrade.createNewInterval(json.sandwiches_per_second_modifier)
              UpgradesAdapter.deleteUpgrade(json.id)
              upgradeDiv.remove()
              App.animateSandwich(json.sandwiches_per_second_modifier, 2800)
            })
          }
        })

        upgradeDiv.append(addUpgradeButton)

        upgradesDiv.append(upgradeDiv)

      })

    }

    static createNewInterval(modifier){
      const counter = document.getElementById('money-count')

      return setInterval(function(){
        counter.innerText = parseInt(counter.innerText) + modifier
      }, 1000)
    }

  }
})()
