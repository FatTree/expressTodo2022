const dummyData = require('../data');
const { responseObj } = require('../public/utile/responseObject');

const list = dummyData.data;

const ACTION = Object.freeze({
    "GET_LIST": "GET_LIST", 
    "GET_ITEM":"GET_ITEM", 
    "CREATE_ITEM":"CREATE_ITEM",
    "UPDATE_ITEM": "UPDATE_ITEM",
    "DELETE_ITEM": "DELETE_ITEM",
    "VALIDATION_FAILED": "VALIDATION_FAILED"
})

exports.todo = (req, res) => {
    const body = req.body;
    const params = req.params;
    let action = params.action;
    let id = params.id;
    const isChecked = body.isChecked;
    const content = body.content;

    let {result, message, data} = {result: true, message: "PASSED!", data:null};

    if (params.id) {
        id = params.id;
        if (typeof id !== 'string' || id.trim() === '') {
            message = "Wrong input!"
            action = ACTION.VALIDATION_FAILED;
        }
        const isExisting = list.find( (item) => {
            return item.id === id;
        });
        if (!isExisting) {
            message = "The record doesn't exist!"
            action = ACTION.VALIDATION_FAILED;
        }
    }
    
    switch(action) {
        case ACTION.GET_LIST:
            data = list;
            break;

        case ACTION.GET_ITEM:
            const l = list.find( (item) => {
                return item.id === id;
            });
            result = true;
            data = l;
            break;
            
        case ACTION.CREATE_ITEM:
            if ( content === null || typeof content !== 'string' || content.trim() === "") {
                result = false;
                message = "Wrong input!"
                res.status(400);
                break;
            }
            const newItem = {
                id: new Date().getTime().toString(),
                isChecked: false,
                content: content
            }
            dummyData.data.push(newItem);
            data = list;
            break;

        case ACTION.UPDATE_ITEM:
            if ( typeof isChecked !== 'boolean' || typeof content !== 'string') {
                result = false;
                message = "Wrong input!"
                res.status(400);
                break;
            }
            list.map( (item, idx) => {
                if (item.id === id) {
                    list[idx].isChecked = isChecked;
                    list[idx].content = content;
                    dummyData.data = list;
                }
            });
            data = list;
            break;

        case ACTION.DELETE_ITEM:
            list.forEach((item, idx) => {
                if ( item.id === id ) {
                    list.splice( idx, 1);
                }
            });
            dummyData.data = list;
            data = list;
            break;

        case ACTION.VALIDATION_FAILED:
            result = false;
            res.status(400);
            break;

        default:
            result = false;
            message = "incorrect action"
            res.status(400);
    }
    res.send(new responseObj(result, message, data));
    return;
}

