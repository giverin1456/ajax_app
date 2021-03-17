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

  def show
    @gibus = Post.find(1)
  end
end