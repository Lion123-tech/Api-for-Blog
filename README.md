# Api-for-Blog

#Data Structure:
Each user contails a field name Publicblogs and Privateblogs which further contains subdocuments for blogs


1)Authentication API:Passwords are hashed
2)Create a new blog if blogs with same title doesn't exist
3)Update a blog after checking collision of title
4)Return all blogs os user with latest post first
5)Return all public blogs (which are published publicly) of all users
6)Maintain likes of a user

#NPM MODULE USED

1)Express-session
2)bcryptjs
