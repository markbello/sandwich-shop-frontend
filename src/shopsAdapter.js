const ShopsAdapter = (function(){
  return class ShopsAdapter {
    static getShop(){
      return fetch('https://sandwich-clicker-api.herokuapp.com/api/v1/shops/1')
      .then(res => res.json())
    }

    static updateShop(newBalance){
      return fetch('https://sandwich-clicker-api.herokuapp.com/api/v1/shops/1',{
        method: 'PATCH',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          balance: newBalance,
          sandwiches_per_second: sandwiches
        })
      })
    }

    static updateBalance(newBalance){
      return fetch('https://sandwich-clicker-api.herokuapp.com/api/v1/shops/1',{
        method: 'PATCH',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          balance: newBalance
        })
      })
      .then(res => res.json())
    }


  }
})()
