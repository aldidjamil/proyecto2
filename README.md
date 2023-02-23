# proyecto2ironhack

Here are the relevant API endpoints (routes) that the Characters API provides to use and which we will be using:

HTTP METHOD  | Route                              | Description                  | JSON
-------------| -----------------------------------| ---------------------------- | ----- |
GET          | `/`                                | Index Page                   |
GET          | `/auth/create-form`                | New user form render         |
POST         | `/auth/create-form`                | New profile form handler     |
GET          | `/auth/login-form`                 | Login form handler           |
POST         | `/auth/login-form`                 | Login form handler           |
POST         | `/auth/logout`                     | Logout form handler          |
GET          | `/user/list-users`                 | List of all users            |
GET          | `/user/edit/:id`                   | Edit profile from render     |
POST         | `/user/edit/:id`                   | Edit profile from handler    |
POST         | `/user/delete/:id`                 | Delete user                  |
GET          | `/user/profile/:id`                | User Profile                 |
POST         | `/addMovie/:action/:movieId`       | Add Movie to Watch/Fav       |
POST         | `/deleteMovie/:action/:movieId`    | Delete Movie to Watch/Fav    |
GET          | `/comment/create`                  | New comment form render      |
POST         | `/comment/create`                  | New comment form handler     |
POST         | `/comment/delete`                  | New comment form handler     |
GET          | `/api/movies`                      | List best 250 movies         | YES
GET          | `/api/movies/details/:id`          | Movie details                | YES
GET          | `/api/movies/MostPopular`          | Movie details                | YES
GET          | `/api/movies/inTheaters`           | Movie details                | YES





