/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("poj12hu5kn22je6")

  // remove
  collection.schema.removeField("2sc6lwso")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yipcawmv",
    "name": "finished",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("poj12hu5kn22je6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2sc6lwso",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "pl07ftzqlammwm7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("yipcawmv")

  return dao.saveCollection(collection)
})
