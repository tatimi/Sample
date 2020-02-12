const shiji = ["前", "前", "後", "後", "前", "後"];

let saikoro_eyes = {
    "上": 1,
    "下": 6,
    "前": 2,
    "後": 5,
    "左": 3,
    "右": 4
};

let masu = 0;

const kaiten_functions = {
    "前": saikoro_eyes => {
        const new_saikoro_eyes = {};
        new_saikoro_eyes["前"] = saikoro_eyes["上"];
        new_saikoro_eyes["上"] = saikoro_eyes["後"];
        new_saikoro_eyes["後"] = saikoro_eyes["下"];
        new_saikoro_eyes["下"] = saikoro_eyes["前"];
        new_saikoro_eyes["左"] = saikoro_eyes["左"];
        new_saikoro_eyes["右"] = saikoro_eyes["右"];
        return new_saikoro_eyes;
    },
    "後": saikoro_eyes => {
        const new_saikoro_eyes = {};
        new_saikoro_eyes["後"] = saikoro_eyes["上"];
        new_saikoro_eyes["下"] = saikoro_eyes["後"];
        new_saikoro_eyes["前"] = saikoro_eyes["下"];
        new_saikoro_eyes["上"] = saikoro_eyes["前"];
        new_saikoro_eyes["左"] = saikoro_eyes["左"];
        new_saikoro_eyes["右"] = saikoro_eyes["右"];
        return new_saikoro_eyes;
    }
};

shiji.forEach(houkou => {
    saikoro_eyes = kaiten_functions[houkou](saikoro_eyes);
    //サイコロの目の状態を更新。
    //引数 houkou には"前"か"後"が入っていて、
    //前回転か後ろ回転の関数が実行される。

    masu += saikoro_eyes["上"];
    //回転後に出ている目（サイコロの上の面）の数値をmasuに加算。
});

console.log(masu);