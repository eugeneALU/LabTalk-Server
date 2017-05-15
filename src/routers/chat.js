const express = require('express');
const bodyParser = require('body-parser');

const groupModel = require('../model/groups.js');
const chatroomModel = require('../model/chatroom.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.post('/groups/list', function(req, res, next) {
    const {searchText, username} = req.body;
    if (!username) {
        const err = new Error('username are required');
        err.status = 400;
        throw err;
    }
    groupModel.list(searchText, username).then(groups => {
        res.json(groups);
    }).catch(next);
});

// Create
router.post('/groups', function(req, res, next) {
    const {groupname, username} = req.body;
    if (!groupname || !username) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    groupModel.create(groupname, username).then(group => {
        res.json(group);
    }).catch(next);
});

// Get
router.get('/groups/:id', function(req, res, next) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Post ID is required');
        err.status = 400;
        throw err;
    }
    groupModel.get(id).then(groups => {
        res.json(groups);
    }).catch(next);
});

// addMembers
router.post('/groups/members/add', function(req, res, next) {
    const {id, username, username_login} = req.body;
    if (!id || !username || !username_login) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    groupModel.addMembers(id, username, username_login).then(groups => {
        res.json(groups);
    }).catch(next);
});

// deleteMembers
router.post('/groups/members/delete', function(req, res, next) {
    const {id, username, username_login} = req.body;
    if (!id || !username || !username_login) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    groupModel.deleteMembers(id, username, username_login).then(groups => {
        res.json(groups);
    }).catch(next);
});
// Delete
router.post('/groups/delete', function(req, res, next) {
    const {id,username} = req.body;
    if (!id || !username) {
        const err = new Error('GROUPID  is required');
        err.status = 400;
        throw err;
    }
    groupModel.delete_(id,username).then(group => {
        res.json(group);
    }).catch(next);
});

/*****************************chats******************************************/
// List
router.post('/chats/list', function(req, res, next) {
    const {id, searchtext} = req.body;
    if (!id) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    chatroomModel.list(id, searchtext).then(chats => {
        res.json(chats);
    }).catch(next);
});

// Create
router.post('/chats/create', function(req, res, next) {
    const {id, username, text} = req.body;
    if (!id || !username || !text) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    chatroomModel.create(id, username, text).then(chat => {
        res.json(chat);
    }).catch(next);
});
/****************************hid***********************************/
// List
router.post('/chats/list/hid', function(req, res, next) {
    const {id, searchtext} = req.body;
    if (!id) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    chatroomModel.list_hid(id, searchtext).then(chats => {
        res.json(chats);
    }).catch(next);
});

// Create
router.post('/chats/create/hid', function(req, res, next) {
    const {id, username, text} = req.body;
    if (!id || !username || !text) {
        const err = new Error('Name are required');
        err.status = 400;
        throw err;
    }
    chatroomModel.create_hid(id, username, text).then(chat => {
        res.json(chat);
    }).catch(next);
});



module.exports = router;
