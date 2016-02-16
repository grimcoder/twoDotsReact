export module  Levels {

    var level1 = {
        "width": 2,
        "height": 6,
        "Rules": {"maxTurns": 8, "amountToCollect": {"red": 5, "yellow": 5, "blue": 5, "brown": 5}},
        "mode": "editor",
        "Grid": [[{"color": "red", "x": 0, "y": 0}, {"color": "red", "x": 1, "y": 0}], [{
            "color": "red",
            "x": 0,
            "y": 1
        }, {"color": "red", "x": 1, "y": 1}], [{"color": "blue", "x": 0, "y": 2}, {
            "color": "blue",
            "x": 1,
            "y": 2
        }], [{"color": "blue", "x": 0, "y": 3}, {"color": "blue", "x": 1, "y": 3}], [{
            "color": "brown",
            "x": 0,
            "y": 4
        }, {"color": "brown", "x": 1, "y": 4}], [{"color": "brown", "x": 0, "y": 5}, {
            "color": "brown",
            "x": 1,
            "y": 5
        }]],
        "turns": 0,
        "score": {"red": 0, "yellow": 0, "brown": 0, "blue": 0, "green": 0}
    }

    export var levels = [level1]
}


