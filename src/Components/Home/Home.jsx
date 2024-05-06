import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useGetAllFriendsQuery,
  useGetPostsQuery,
} from "./../Store/API's/baseURL";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      return navigate("/login");
    }
  }, []);
  const {
    data: posts,
    error: postError,
    isLoading: postLoading,
  } = useGetPostsQuery();
  console.log(posts?.data?.posts, postError, postLoading);

  const { data: friendsList, error:friendsError, isLoading:friendsLoading } = useGetAllFriendsQuery();
  console.log(friendsList, friendsError, friendsLoading);

  return (
    <div>
      <div>
        {postLoading && <h1>Loading...</h1>}
        {posts?.data?.posts &&
          posts?.data.posts.map((post) => {
            return (
              <div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
