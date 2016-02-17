export module  Levels {
    var level0 = {
        "width": 3,
        "height": 3,
        "Rules": {"maxTurns": 5, "amountToCollect": {"red": 2, "yellow": 2, "blue": 2, "brown": 2}},
        "mode": "editor",
        "Grid": [[{"color": "blue", "x": 0, "y": 0}, {"color": "blue", "x": 1, "y": 0}, {
            "color": "blue",
            "x": 2,
            "y": 0
        }], [{"color": "blue", "x": 0, "y": 1}, {"color": "blue", "x": 1, "y": 1}, {
            "color": "blue",
            "x": 2,
            "y": 1
        }], [{"color": "blue", "x": 0, "y": 2}, {"color": "blue", "x": 1, "y": 2}, {"color": "blue", "x": 2, "y": 2}]],
        "turns": 0,
        "score": {"red": 0, "yellow": 0, "brown": 0, "blue": 0, "green": 0}
    }

    var level1 = {
        "width": 3,
        "height": 6,
        "Rules": {"maxTurns": 10, "amountToCollect": {"red": 2, "yellow": 2, "blue": 2, "brown": 2}},
        "mode": "editor",
        "Grid": [[{"color": "red", "x": 0, "y": 0}, {"color": "red", "x": 1, "y": 0}, {
            "color": "red",
            "x": 2,
            "y": 0
        }],
            [{"color": "red", "x": 0, "y": 1}, {"color": "red", "x": 1, "y": 1}, {
                "color": "red",
                "x": 2,
                "y": 1
            }], [{"color": "yellow", "x": 0, "y": 2}, {"color": "yellow", "x": 1, "y": 2}, {
                "color": "yellow",
                "x": 2,
                "y": 2
            }], [{"color": "yellow", "x": 0, "y": 3}, {"color": "yellow", "x": 1, "y": 3}, {
                "color": "yellow",
                "x": 2,
                "y": 3
            }], [{"color": "blue", "x": 0, "y": 4}, {"color": "blue", "x": 1, "y": 4}, {
                "color": "blue",
                "x": 2,
                "y": 4
            }], [{"color": "blue", "x": 0, "y": 5}, {"color": "blue", "x": 1, "y": 5}, {
                "color": "blue",
                "x": 2,
                "y": 5
            }]],
        "turns": 0,
        "score": {"red": 0, "yellow": 0, "brown": 0, "blue": 0, "green": 0}
    }

    export var levels = [level0, level1]
}


