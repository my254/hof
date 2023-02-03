const Mailer = require('./Mailer')
const fs = require('fs')
const path = require('path')
const products = require('./mongo').db().collection('props')
const ObjectID = require('mongodb').ObjectId


const Db = function(data,action){
    this.data = data
    this.action = action
}
Db.prototype.get = function(){
    return new Promise( async (resolve,reject) => {
      const array = await  products.find().toArray()
      if(array && array.length !== 0){
         resolve(array)
      }else{
       reject("Error getting products!")
      }
     
})
}
Db.prototype.get_one = function(){
    return new Promise( async (resolve,reject) => {
     products.findOne({_id: ObjectID(this.data)}).then( products => {
         resolve(products)
     } ).catch( err => {
         reject("not found")
     } )
})
}

Db.prototype.add_prop = function(){
return new Promise((resolve,reject) => {
    products.insertOne( this.data ).then( () => resolve("added product") ).catch( err => reject("Failed to add product") )
})
}

Db.prototype.edit_asset = function(){
    //console.log(this.action)
    return new Promise((resolve,reject) => {
        //console.log(this.data)
           switch(this.action){
           case "add_asset_images":
            products.findOneAndUpdate({_id: ObjectID(this.data.id)},{$push: { images: this.data.image }})
            .then(user => {
                console.log("helllllooooo")
                resolve("Image updated ")
            })
            .catch(err => {
                console.log("error")
                reject(`Error while updating your product image try again later!`)
            })
            break;
            case "add_asset_features":
                products.findOneAndUpdate({_id: ObjectID(this.data.id)},{$set: { features: this.data.features }})
                .then(user => {
                    console.log("helllllooooo")
                    resolve("features updated ")
                })
                .catch(err => {
                    console.log("error")
                    reject(`Error while updating your product features try again later!`)
                })
                break;
                case "add_asset_residence":
                    products.findOneAndUpdate({_id: ObjectID(this.data.id)},{$set: { residence: this.data.residence }})
                    .then(user => {
                        console.log("helllllooooo")
                        resolve("payment updated ")
                    })
                    .catch(err => {
                        console.log("error")
                        reject(`Error while updating your product payment try again later!`)
                    })
                    break;
           
                case "delete_asset":
                    //console.log(this.data)
                    products.findOneAndDelete({_id: ObjectID(this.data)}).then(() => {
                        resolve("deleted")
                    }).catch(() => {
                        reject("failed to delete !")
                    })
                    break;
           }
        
     
    })
}

module.exports = Db