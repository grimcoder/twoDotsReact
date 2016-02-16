export module  Levels {

    var level1 = {
        "width": 2,
        "height": 6,
        "Rules": {"maxTurns": 10, "amountToCollect": {"red": 3, "yellow": 6, "blue": 4}},
        "mode": "board",
        "Grid": [[{"color": "blue", "x": 0, "y": 0}, {"color": "blue", "x": 1, "y": 0}], [{
            "color": "brown",
            "x": 0,
            "y": 1
        }, {"color": "blue", "x": 1, "y": 1}], [{"color": "blue", "x": 0, "y": 2}, {
            "color": "brown",
            "x": 1,
            "y": 2
        }], [{"color": "blue", "x": 0, "y": 3}, {"color": "yellow", "x": 1, "y": 3}], [{
            "color": "yellow",
            "x": 0,
            "y": 4
        }, {"color": "blue", "x": 1, "y": 4}], [{"color": "red", "x": 0, "y": 5}, {"color": "blue", "x": 1, "y": 5}]],
        "turns": 0,
        "score": {"red": 0, "yellow": 0, "brown": 0, "blue": 0, "green": 0}
    }

    export var levels = [level1]
}


