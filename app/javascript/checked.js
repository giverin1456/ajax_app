function check() {
  const posts = document.querySelectorAll(".post");
  // セレクタを読み込む
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    



    post.addEventListener("click", () => { 
    // 要素一つずつに対してクリックした時に動作するイベントを設定
    const postId = post.getAttribute("data-id");
    // getAttributeで属性値(data-id)を取得することができる
    const XHR = new XMLHttpRequest();
    // エンドポイントを呼び出すためにXMLHttpRequestを使用してHTTPリクエストを行う？？？？？
    // 上記でオブジェクトを生成することでXMLHttpRequestメソッドを使用できるようになる
    XHR.open("GET", `/posts/${postId}`, true);
    // HTTPメソッドの指定,パスの指定,非同期通信のON/OFF
    XHR.responseType = "json";
    // json形式のデータをレスポンスする
    XHR.send();
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
        // HTTPステータスコードが200以外の場合、ifはtrueになりXHR.statusTextによってエラーメッセージを表示させる。
        // return null;で下の処理が行われないようにしている
      }
      const item = XHR.response.post;
      // 上記でレスポンスされてきたjsonにアクセスできるようになる。checkedアクションで返却したitemは、XHR.response.postで取得できます。
      if (item.checked === true) {
        post.setAttribute("data-check", "true");
      } else if (item.checked === false) {
        post.removeAttribute("data-check");
      }
    　};
  　});
  });
}
setInterval(check, 1000);
// check関数が1秒に1度実行される