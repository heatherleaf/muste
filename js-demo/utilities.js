
// List utilities

function flatten(obj) {
    if (obj instanceof Array) {
        var list = [];
        for (var i = 0; i < obj.length; i++) {
            list.push.apply(list, flatten(obj[i]));
        }
        return list;
    } else {
        return [obj];
    }
}

function common_prefix(sequences) {
    if (!sequences.length) {
        return [];
    }
    var minlen = Math.min.apply(this, sequences.map(function(seq){return seq.length}));
    for (var i = 0; i < minlen; i++) {
        var value = sequences[0][i];
        for (var seq = 1; seq < sequences.length; seq++) {
            if (sequences[seq][i] != value) {
                return sequences[seq].slice(0, i);
            }
        }
    }
    return sequences[0].slice(0, minlen);
}

// Converting a list of strings into a string, so that the original list can be retrieved

function ishash(hash) {
    return (typeof(hash) == "string" && /^\{\[\"[0-9]/.test(hash));
}

function hash(args) {
    return JSON.stringify(args);
}

function unhash(hash) {
    return JSON.parse(hash);
}

// Timing

var TIMERS = {};
function RESET_TIMERS() {
    TIMERS = {};
}
function START_TIMER(n) {
    if (!TIMERS[n]) TIMERS[n] = 0;
    TIMERS[n] -= Date.now();
}
function STOP_TIMER(n) {
    TIMERS[n] += Date.now();
}
function LOG_TIMERS() {
    console.log("TIMERS", JSON.stringify(TIMERS));
}

function getTime() {
    return Date.now();
}

function showTime(start) {
    return (getTime() - start).toFixed(1) + " ms";
}

// Pretty-printing

function strObject(obj) {
    if (obj == null) {
	    return "" + obj;
    } else if (obj instanceof Array) {
	    var result = obj.map(function(o){
	        return strObject(o);
	    });
	    return "[" + result.join(", ") + "]";
    } else if (obj instanceof Object) {
	    var result = [];
	    for (var key in obj) {
	        result.push(key + ": " + strObject(obj[key]));
	    }
	    return "{" + result.join(", ") + "}";
    } else if (typeof obj == "string") {
	    return '"' + obj + '"'
    } else {
	    return "" + obj;
    }
}

// Error handling

function alertError(title, description) {
    alert("*** " + title + "***\n" + description);
}
