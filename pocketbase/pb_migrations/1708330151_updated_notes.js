/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("poj12hu5kn22je6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kauedoeu",
    "name": "finishedDate",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("poj12hu5kn22je6")

  // remove
  collection.schema.removeField("kauedoeu")

  return dao.saveCollection(collection)
})
