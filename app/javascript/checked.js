function check() {
  const posts = document.querySelectorAll(".post");
  // セレクタを読み込む。documentオブジェクト(あらかじめ定義されているオブジェクト)
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // setInterval(check, 1000);と設定してある、1秒間の間にtrueを付与する処理とfalseを付与する処理が、連続でおこなわれるので修正した



    post.addEventListener("click", () => { 
    // 要素一つずつに対してクリックした時に動作するイベントを設定
    const postId = post.getAttribute("data-id");
    // getAttributeで属性値(data-id(メモのデータ))を取得できる
    const XHR = new XMLHttpRequest();
    // エンドポイントを呼び出すためにXMLHttpRequestを使用してHTTPリクエストを行う？？？？？
    // 上記でオブジェクトを生成することでXMLHttpRequestメソッドを使用できるようになる
    XHR.open("GET", `/posts/${postId}`, true);
    // HTTPメソッドの指定,パスの指定(pathパラメーター？？),非同期通信のON/OFF(trueの時にON？)
    XHR.responseType = "json";
    // レスペンスとしてどのような形式のデータを指定するのか。json形式のデータをレスポンス
    XHR.send();
    // sendメソッド使用することはじめてリクエストが行える

    XHR.onload = () => {
      // XMLHttpRequestで定義されているプロパティで、レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        // HTTPステータスコードが200以外の場合、ifはtrueになりXHR.statusTextによってエラーメッセージを表示させる。
        // return null;で下の処理が行われないようにしている
      }

      const item = XHR.response.post;
      // 上記でレスポンスされてきたjsonにアクセスできるようになる。checkedアクション(controller)で返却したitemは、XHR.response.postで取得できます。
      if (item.checked === true) {
        post.setAttribute("data-check", "true");
        // 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
      } else if (item.checked === false) {
        post.removeAttribute("data-check");
        // 既読じゃなければdata-checkは属性ごと削除される
      }
     };
   });
  });
}
setInterval(check, 1000);
// check関数が1秒に1度実行される.