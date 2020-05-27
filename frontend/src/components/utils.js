import axios from "axios";

//画面に表示されている範囲(中心から四隅までの距離)を取得する関数
const getDistanse = map => {
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
    let url = "http://localhost:8000/api/v1/clampphoto/" + "?point=" + String(longitude) + "," + String(latitude) + "&dist=" + String(distance)
    console.log(url)
    return url
}

const getClampRecords = async (url, apiToken) => {
    let response = "default";

    await axios.get(url)
        .then(function (data) {
            response = data.data
            // for (var i = 0; i < response.data.results.length; i++) {
            //   self.image_items.push(response.data.results[i]);
            // }
        })
        .catch(function (error) {
            console.log(error);
        });
    return response

}
//1枚の画像の解析結果からその解析状況に応じた画像URLを返す
const getPhotoUrl = clampInfo => {
    let photoUrl = clampInfo.source_image_for_view_url;//写真のURL
    if (clampInfo.inference_result.length > 0) {
        let latestIndex = clampInfo.inference_result.length - 1;
        let latestInference = clampInfo.inference_result[latestIndex];

        photoUrl = latestInference.overlayed_image_url;//写真のURL
    }
    return photoUrl
}
//1枚の画像の解析結果から未解析なら解析状況、解析済みなら検出されたクランプ数を返す
const countClamps = clampInfo => {
    if (clampInfo.inference_result.length > 0) {
        let latestIndex = clampInfo.inference_result.length - 1;
        let latestInference = clampInfo.inference_result[latestIndex];

        const clampCount = latestInference.inferenced_clamps.length;//総クランプ数
        return `解析済み (クランプ${clampCount}個)`
    }
    else if (clampInfo.inference_attempts >= 1 && clampInfo.inference_attempts <= 3) {
        return "解析待ち"
    }
    else if (clampInfo.inference_attempts > 3) {
        return "解析失敗"
    }
    return "未解析"
}
//未解析なら解析状況、解析済みなら検出されたクランプ数を返す
const countOperatedClamps = clampInfo => {
    if (clampInfo.inference_result.length > 0) {
        let latestIndex = clampInfo.inference_result.length - 1;
        let latestInference = clampInfo.inference_result[latestIndex];

        const operatedClampCount = latestInference.inferenced_clamps.filter(function (element) {
            return element.clamp_condition === "actuated";
        }).length;//動作済みクランプ数 
        return `解析済み (クランプ${operatedClampCount}個)`
    }
    else if (clampInfo.inference_attempts >= 1 && clampInfo.inference_attempts <= 3) {
        return "解析待ち"
    }
    else if (clampInfo.inference_attempts > 3) {
        return "解析失敗"
    }
    return "未解析"
}
// 画像に付加されたメモを返す
const getMemo = (clampInfo) => {
    return clampInfo.memo //メモ
}


export {
    getDistanse,
    createURL,
    getClampRecords,
    getPhotoUrl,
    countClamps,
    countOperatedClamps,
    getMemo
}

// createClampListContent = (clampListInfo) => {
//     let clamp_summaries = [] //各クランプ写真の情報のリスト

//     let clamp_summary = {} //各クランプ写真の情報
//     let photo_url = photo_detail.source_image_for_view_url;//写真のURL(解析済みなら検出された矩形が描画された画像、未解析なら元画像)
//     let inference_status = "未解析"//解析結果

//     if(photo_detail.inference_result.length > 0){
//         //解析結果が存在する場合
//         let latest_index = photo_detail.inference_result.length - 1;
//         let latest_inference = photo_detail.inference_result[latest_index];
        
//         photo_url = latest_inference.overlayed_image_url;//写真のURLに最新の矩形が描画された画像を設定
//         inference_status=`解析済み (クランプ${latest_inference.inferenced_clamps.length}個)`
//     }
//     else if(photo_detail.inference_attempts >=1 && photo_detail.inference_attempts <=3){
//         inference_status="解析待ち"
//     }
//     else if(photo_detail.inference_attempts > 3){
//         inference_status="解析失敗"
//     }

//     clamp_summary["photo_url"]=photo_url
//     clamp_summary["memo"] = photo_detail.memo//メモ
//     clamp_summary["inference_status"]=inference_status
//     clamp_summaries.push(clamp_summary)
//     return photo_url
// }