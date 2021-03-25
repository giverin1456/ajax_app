class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
    # 表示順番を変える
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
    # メモ作成時に未読の情報を保存するようにしたことと、Ajaxを実現するため「レスポンスをJSONに変更したこと」

    # Post.create(content: params[:content])
    # redirect_to action: :index
    # メモを保存した後にトップページへリダイレクトする
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      # 既読であるか否かを判定。
      post.update(checked: false)
      # checkedがfalse(既読)なら既読を解除する。updateというActiveRecordのメソッドを使用して更新。
    else
      post.update(checked: true)
      # 既読にするためtrueへ変更
    end

    item = Post.find(params[:id])
    render json: { post: item }
    # 更新したレコードをitem = Post.find(params[:id])で取得し直し、
    # render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています。
  end
end

# checkedアクション→既読の操作を行なった時に実行される



# エンドポイントとは？