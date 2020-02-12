
const saikoro_infos = [
    {
        eyes: {"上": 1, "下": 2, "前": 3, "後": 4, "左": 5, "右": 6},
        shiji: ["前", "前", "後", "後", "前", "後"]
    },
    {
        eyes: {"上": 2, "下": 3, "前": 4, "後": 5, "左": 6, "右": 1},
        shiji: ["後", "前", "後"]
    },
    {
        eyes: {"上": 3, "下": 4, "前": 5, "後": 6, "左": 1, "右": 2},
        shiji: ["後", "後", "前", "後"]
    },
    {
        eyes: {"上": 4, "下": 5, "前": 6, "後": 1, "左": 2, "右": 3},
        shiji: ["前", "後", "前", "後", "前"]
    },
    {
        eyes: {"上": 5, "下": 6, "前": 1, "後": 2, "左": 3, "右": 4},
        shiji: ["前", "前", "前", "後", "後", "前", "後"]
    }
];

class Saikoro{
    constructor(saikoro_eyes){
        this.eyes = saikoro_eyes;
        //引数でもらったサイの目のデフォルト位置を記憶。

        this.func_names = {
            "前": "mae_kaiten",
            "後": "ushiro_kaiten",
            "右":"migi_kaiten"
        };
        //前と後、それぞれの関数が実行されるように
        //関数名の連想配列を作成。
    }

    //サイコロ自身を回転させるメソッド
    kaiten(houkou){
        const func_name = this.func_names[houkou];
        //houkou（方向）が前ならmae_kaiten、
        //後ろだったらushiro_kaitenがfunc_nameにセットされる。

        this[func_name]();
        //mae_kaitenまたはushiro_kaitenメソッドを実行。
    }

    //前回転メソッド
    mae_kaiten(){
        const new_saikoro_eyes = {};
        new_saikoro_eyes["前"] = this.eyes["上"];
        new_saikoro_eyes["上"] = this.eyes["後"];
        new_saikoro_eyes["後"] = this.eyes["下"];
        new_saikoro_eyes["下"] = this.eyes["前"];
        new_saikoro_eyes["左"] = this.eyes["左"];
        new_saikoro_eyes["右"] = this.eyes["右"];
        this.eyes = new_saikoro_eyes;
    }

    //後ろ回転メソッド
    ushiro_kaiten(){
        const new_saikoro_eyes = {};
        new_saikoro_eyes["後"] = this.eyes["上"];
        new_saikoro_eyes["下"] = this.eyes["後"];
        new_saikoro_eyes["前"] = this.eyes["下"];
        new_saikoro_eyes["上"] = this.eyes["前"];
        new_saikoro_eyes["左"] = this.eyes["左"];
        new_saikoro_eyes["右"] = this.eyes["右"];
        this.eyes = new_saikoro_eyes;
    }
     //右回転メソッド
     migi_kaiten(){
        const new_saikoro_eyes = {};
        new_saikoro_eyes["後"] = this.eyes["後"];
        new_saikoro_eyes["下"] = this.eyes["右"];
        new_saikoro_eyes["前"] = this.eyes["前"];
        new_saikoro_eyes["上"] = this.eyes["左"];
        new_saikoro_eyes["左"] = this.eyes["下"];
        new_saikoro_eyes["右"] = this.eyes["上"];
        this.eyes = new_saikoro_eyes;
    }
    

    //いま出ている目を教えてくれるメソッド
    get_eye(){
        return this.eyes["上"];
    }
}

class Koma{
    constructor(saikoro_info){
        this.shiji = saikoro_info.shiji;
        //方向指示の情報をshijiプロパティに格納。

        this.saikoro = new Saikoro(saikoro_info.eyes);
        //サイコロオブジェクトを生成して、saikoroプロパティに格納。

        this.masu = 0;
        //何マス目にいるかを保存しておくプロパティ。
    }

    //サイコロを回転させるメソッド
    saikoro_kaiten(houkou){
        this.saikoro.kaiten(houkou);
        //自身の持つサイコロに「回転せえや！」と指示。
    }
    susumu(){
        this.masu += this.saikoro.get_eye();
        //自身の持つサイコロに「今の目を教えてぇな！」と指示し、
        //教えてもらった数の分だけマスを進む。
    }
    genzai_masu(){
        return this.masu;
        //現在のマスの数値を返す。
    }
}

//サイコロと方向指示の情報を元に、5体のコマ君が入った配列を生成。
const komas = saikoro_infos.map(saikoro_info => new Koma(saikoro_info));

//コマ君たちをforEachで回す。
komas.forEach(koma => {
    //コマ君は指示書に書いてあるぶんだけ、
    koma.shiji.forEach(houkou => {
        koma.saikoro_kaiten(houkou);
        //サイコロを回転させ、

        koma.susumu();
        //マスを進む。
    });
    console.log(koma.genzai_masu());
    //進み終わったら、現在のマスを出力。
});