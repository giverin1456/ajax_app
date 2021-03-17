class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # 表示順番を変える
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
    # メモを保存した後にトップページへリダイレクトする
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      # 既読であるか否かを判定するプロパティを指定
      post.update(checked: false)
      # updateというActiveRecordのメソッドを使用して更新
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item}
    # 最後に、更新したレコードをitem = Post.find(params[:id])で取得し直し、
    # render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています。
  end
end

# checkedアクション→既読の操作を行なった時に実行される