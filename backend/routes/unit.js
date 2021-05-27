const CONSTANTS = require("../constants");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const sampleData = require("../sampleData");

const router = express.Router();

const fakedata = [
	{
		id: 1,
		name: "ZON01",
		managedBy: "eu",
		maxAllow: 2,
	},
	{
		id: 2,
		name: "ZON02",
		managedBy: "eu",
		maxAllow: 2,
	},
];

router.get("/", (req, res) => {
	res.json(fakedata);
});

router.get("/:id", function (req, res) {
	let found = fakedata.find(function (item) {
		return item.id === parseInt(req.params.id);
	});

	if (found) {
		res.status(200).json(found);
	} else {
		res.sendStatus(404);
	}
});

router.post("/", function (req, res) {
	let itemIds = fakedata.map((item) => item.id);
	let orderNums = fakedata.map((item) => item.order);

	let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
	let newOrderNum =
		orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

	let newItem = {
		id: newId,
		name: req.body.title,
		managedBy: "eu",
		maxAllow: 1,
	};

	fakedata.push(newItem);

	res.status(201).json(newItem);
});

router.put("/:id", function (req, res) {
	let found = fakedata.find(function (item) {
		return item.id === parseInt(req.params.id);
	});

	if (found) {
		let updated = {
			id: found.id,
			name: req.body.name,
			managedBy: req.body.managedBy,
			maxAllow: req.body.maxAllow,
		};

		let targetIndex = fakedata.indexOf(found);

		data.splice(targetIndex, 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete('/:id', function (req, res) {
	let found = fakedata.find(function (item) {
	  return item.id === parseInt(req.params.id);
	});

	if (found) {
	  let targetIndex = fakedata.indexOf(found);

	  fakedata.splice(targetIndex, 1);
	}

	res.sendStatus(204);
  });

/*
// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, (req, res) => {
	res.json(sampleData.textAssets);
});

// LIST ENDPOINTS
router.get(CONSTANTS.ENDPOINT.LIST, function (req, res) {
	res.json(sampleData.listTextAssets);
});

router.post(CONSTANTS.ENDPOINT.LIST, function (req, res) {
	let listItem = {
		text: req.body.text,
		id: uuidv4(),
	};
	sampleData.listTextAssets.unshift(listItem);
	res.json(listItem);
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:id", function (req, res) {
	const { id } = req.params;
	var index = sampleData.listTextAssets.findIndex(
		(listItem) => listItem.id === id
	);
	if (index > -1) {
		sampleData.listTextAssets.splice(index, 1);
		res.json({ id, text: "This commented was deleted" });
	} else {
		res.status(404).send("Could not find item with id:" + id);
	}
});

*/

module.exports = router;
