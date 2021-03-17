Rails.application.routes.draw do
  get 'posts', to: 'posts#index'
  get 'posts/new', to: 'posts#new'
  # 新規投稿を作成するページを作成するのでアクション名は/new/
  post 'posts', to: 'posts#create'
  get 'posts/show', to: 'posts#show'
 end
#  postsがURLに表示される
# httpメソッドがget,post
# form_withとルーティングは合致していないといけない