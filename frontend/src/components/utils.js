//画面に表示されている範囲(中心から四隅までの距離)を取得する関数
const getDistanse = map =>{
    //中心座標を取得
    let pos = map.getCenter();
    //北端と西端の座標を取得
    let bounds = map.getBounds();
    let posNW = bounds.getNorthWest();
    let dist = Math.floor(pos.distanceTo(posNW) * 10000) / 10000//中心から北西端までの距離[m]を取得
    return dist
}
// 放電クランプAPIから解析結果を取得するためのurlを作成する
const createURL = (longitude, latitude, distance) => {
        let url = "/api/v1/clampphoto/"+"?point="+(longitude)+","+(latitude)+"&dist="+(distance)
        console.log(url)
        return url
}

const getClampRecords = (url, apiToken) => {
    $.ajax({
        type: "GET",
        url: url,
        headers:{
            Authorization: apiToken
        }
    }).done(function (data) {
        return data;
    });
}

export {
    getDistanse,
    createURL
}