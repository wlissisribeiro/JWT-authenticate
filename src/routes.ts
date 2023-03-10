import { Router } from 'express'

import { AuthUser } from './controllers/AuthUserController';
import { CreatePost } from './controllers/CreatePostController'
import { CreateUser } from './controllers/CreateUserController'
import { DeletePost } from './controllers/DeletePostController';
import { ListPosts } from './controllers/ListPostsController';
import { ListPostsUser } from './controllers/ListPostsUserController';
import { Authenticate } from './middleware/authenticate';


export const routes = Router()

routes.post("/register", CreateUser);
routes.post("/post",Authenticate, CreatePost);
routes.post("/login",AuthUser);

routes.get("/posts",Authenticate ,ListPostsUser);
routes.get("/home",Authenticate,ListPosts);

routes.delete("/delete/:post_id",Authenticate,DeletePost);