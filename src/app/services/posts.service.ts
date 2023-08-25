import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../interfaces/post.interface";

@Injectable({
    providedIn: 'root'
})

export class PostsService {

    constructor(private http:HttpClient) {}

    public getAllPosts():Observable<Post[]> {
        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    }

    public getPostById(id:number):Observable<Post> {
        return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
    }
}