Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
Task = function(name, priority, project, duedate, done) {
	this._name = name;
	this.priority = priority;
	this.project = project;
	this.duedate = duedate;
    this.done = done;
}
/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
function ListModel(items) {
    this._items = items;
    this._selectedIndex = -1;

    this.itemAdded = new MVCEvent(this);
    this.itemRemoved = new MVCEvent(this);
}

ListModel.prototype = {
    getItems : function () {
        return [].concat(this._items);
    },

    addItem : function (item) {
        this._items.push(item);
        this.itemAdded.notify({ item : item });
    },

    removeItemAt : function (index) {
        var item;

        item = this._items[index];
        this._items.splice(index,1);
        this.itemRemoved.notify({ item : item });
    }
};


function MVCEvent(sender) {
    this._sender = sender;
    this._listeners = [];
    
    var _this=this;
}

MVCEvent.prototype = {
    attach : function (listener) {
        this._listeners.push(listener);
    },
    notify : function (args) {
        var index;

        for (index = 0; index < this._listeners.length; index += 1) {
            this._listeners[index](this._sender, args);
        }
    }
};

/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
function ListView(model, elements) {
    this._model = model;
    this._elements = elements;

    this.addButtonClicked = new MVCEvent(this);
    this.delButtonClicked = new MVCEvent(this);
    this.checkboxClicked = new MVCEvent(this);

    var _this = this;
    
    this.CBC= _this.checkboxClicked;

    // attach model listeners
    this._model.itemAdded.attach(function () {
        _this.rebuildList();
    });
    this._model.itemRemoved.attach(function () {
        _this.rebuildList();
    });
    // attach listeners to HTML controls
    /*this._elements.list.onchange = function (e) {
        _this.listModified.notify({ index : e.target.selectedIndex });
    };
    */
    this._elements.addButton.onclick = function () {
        _this.addButtonClicked.notify();
    };
    this._elements.delButton.onclick = function () {
        _this.delButtonClicked.notify();
    };
}

ListView.prototype = {
    show : function () {
        this.rebuildList();
    },

    rebuildList : function () {
    	var _this = this;
    	
    	donotify = function() {
    		_this.checkboxClicked.notify();
    	}
        var list, items, key;
        
        this._elements['cb'] = [];

        list = this._elements.list;
        list.innerHTML = "";
        
        var iterover= [];

        items = this._model.getItems();
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                var newoption = document.createElement("li");
                var cb = document.createElement('input');
                cb.type='checkbox';
                cb.tagName = 'cb';
                this._elements['cb'].push(cb);
                cb.onclick = donotify             
                newoption.className = items[key].priority;
                newoption.appendChild(cb);
                newoption.appendChild(document.createTextNode(items[key]._name + " "));
                newoption.appendChild(document.createTextNode("due: " + items[key].duedate));

                if (items[key].project != "" && iterover.contains(items[key].project)) {
                    var Project = document.getElementById(items[key].project);
                    Project.appendChild(newoption);
                }
                else if (items[key].project == "") {   
                    list.appendChild(newoption);
                }
                else if (items[key].project != "") {
                    var special = document.createElement('li');    
                    var newproject = document.createElement('ul');
                    newproject.id = items[key].project;
                    newproject.appendChild(newoption);
                    var node = document.createTextNode(items[key].project);
                    special.appendChild(node);
                    special.appendChild(newproject);
                    list.appendChild(special);
                }

            } iterover.push(items[key].project);
        }
        
    }
}


/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
function ListController(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
        _this.saveList();
    });

    this._view.delButtonClicked.attach(function () {
        _this.delItem();
        _this.saveList();
    });
    this._view.checkboxClicked.attach(function () {
        _this.checkifdone();
        _this.saveList();
    });
}

ListController.prototype = {
    addItem : function () {
        var item = new Task(this._view._elements['taskbox'].value, this._view._elements['priority'].value, this._view._elements['project'].value, this._view._elements['due'].value, false);
        if (item) {
            this._model.addItem(item);
            this._view._elements['taskbox'].value = "";
            this._view._elements['priority'].value = High;
            this._view._elements['due'].value = "";
        }
    },

    checkifdone : function() {
        var index;
        for (index=0; index < this._model._items.length ; index++) {
                if (this._view._elements['cb'][index].checked == true) {
                    this._model._items[index].done = true;
                }
            }
    },

    delItem : function() {
        var index;
        for (index = 0; index < this._model._items.length ; index++) {
                if (this._model._items[index].done == true) {
                    this._model.removeItemAt(index);
                }
        }
    },
    saveList : function() {
        stringed = JSON.stringify(this._model._items);
        localStorage.setItem("todoSave", stringed);
    }
};