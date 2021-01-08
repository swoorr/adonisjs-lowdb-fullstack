'use strict'

const View = require("@adonisjs/framework/src/View")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)


class WebController {

    index ({request, response, view}) {
        var randId = parseInt(Math.random() * 9 * 9 * 9);
        db.get('posts')
        .push({ id: randId, title: 'new number is : ' + randId })
        .write()
        return response.send(view.render("welcome", {sitename:"Auto create item"}))
    }
    
    lists ({request, response, view}) {
        return response.send(view.render("lists", {
            sitename:"List items",
            list:db.get('posts').value()
        }))
    }

    async delete({params, request, response, view}){
        db.get('posts').remove({ id: parseInt(params.id) }).write()
        response.redirect('/lists', true)
    }
}

module.exports = WebController
