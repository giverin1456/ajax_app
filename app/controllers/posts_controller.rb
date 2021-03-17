class PostsController < ApplicationController
  def index
    # 一覧表示ページを表示するリクエストに対応して動く、アクション
    @posts = Post.all
    # rubyのインスタンス変数
  end

  def new
  end

  def create
    Post.create(content: params[:content])
  end

  def show
    @gibus = Post.find(1)
  end
end

# routes.rbとposts_controller.rbが繋がっているのか？どういうコードで？／