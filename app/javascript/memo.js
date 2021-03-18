function memo() {
  const submit = document.getElementById("submit");
  // 送信を押したらデータを取得できる
  submit.addEventListener("click", (e) => {
      // 「e」って何？？？
    const formData = new FormData(document.getElementById("form"));
    // 引数にフォームの要素を渡すことで、そのフォームに入力された値を取得できる
    const XHR = new XMLHttpRequest();
    // XMLHttpRequestのオブジェクトを生成
    XHR.open("POST", "/posts", true);
    // リクエストの内容を引数へ追記
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素
      const formText = document.getElementById("content");
      // メモの入力フォームを取得
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加
      formText.value = "";
      // メモの入力フォームに入力されたままの文字はリセットされる。
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
