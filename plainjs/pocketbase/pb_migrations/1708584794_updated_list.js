/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nz88kha30nrhjkf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xs1qyhvp",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "e9u6j61sresquys",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nz88kha30nrhjkf")

  // remove
  collection.schema.removeField("xs1qyhvp")

  return dao.saveCollection(collection)
})
