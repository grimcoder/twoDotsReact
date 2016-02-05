/**
 * Created by taraskovtun on 2/3/16.
 */

export module  Levels {
    var level1 = {
        "width": 4,
        "height": 4,
        "Rules": {"maxTurns": 20, "amountToCollect": {"red": "3", "yellow": "6", "blue": "4"}},
        "mode": "board",
        "Grid": [[{"className": "unselected", "color": "green", "x": 0, "y": 0}, {
            "className": "unselected",
            "color": "green",
            "x": 1,
            "y": 0
        }, {"className": "unselected", "color": "blue", "x": 2, "y": 0}, {
            "className": "unselected",
            "color": "yellow",
            "x": 3,
            "y": 0
        }], [{"className": "unselected", "color": "brown", "x": 0, "y": 1}, {
            "className": "unselected",
            "color": "blue",
            "x": 1,
            "y": 1
        }, {"className": "unselected", "color": "blue", "x": 2, "y": 1}, {
            "className": "unselected",
            "color": "red",
            "x": 3,
            "y": 1
        }], [{"className": "unselected", "color": "blue", "x": 0, "y": 2}, {
            "className": "unselected",
            "color": "green",
            "x": 1,
            "y": 2
        }, {"className": "unselected", "color": "brown", "x": 2, "y": 2}, {
            "className": "unselected",
            "color": "blue",
            "x": 3,
            "y": 2
        }], [{"className": "unselected", "color": "green", "x": 0, "y": 3}, {
            "className": "unselected",
            "color": "blue",
            "x": 1,
            "y": 3
        }, {"className": "unselected", "color": "blue", "x": 2, "y": 3}, {
            "className": "unselected",
            "color": "yellow",
            "x": 3,
            "y": 3
        }]],
        "startDrag": false,
        "turns": 0,
        "score": {"red": 0, "yellow": 0, "brown": 0, "blue": 0, "green": 0},
        "message": "You won!!!"
    }

    export var levels = [level1]
}


