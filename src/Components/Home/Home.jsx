import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useAddFriendMutation,
  useCreatePostMutation,
  useGetAllFriendsQuery,
  useGetPostsQuery,
} from "./../Store/API's/baseURL";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CollectionsIcon from "@mui/icons-material/Collections";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Home() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [addFriend] = useAddFriendMutation();
  const [createPost] = useCreatePostMutation();
  const [writePost, setWritePost] = React.useState("");
  const [postImg, setPostImg] = React.useState(null);




  useEffect(() => {
    let time = setTimeout(() => {
      const jwt = Cookies.get("jwt");
      if (!jwt) {
        return navigate("/login");
      }
    }, 1000);
    return clearTimeout(time);
  }, []);
  const {
    data: posts,
    error: postError,
    isLoading: postLoading,
  } = useGetPostsQuery();

console.log(posts?.data?.posts,"posts")

  const {
    data: friendsList,
    error: friendsError,
    isLoading: friendsLoading,
  } = useGetAllFriendsQuery();

  const handleAddFriendClick = (friend) => () => {
    console.log(friend);
    addFriend({ friendId: friend._id })
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const handlePostUpload = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.postText);
    formData.append("body", data.postText);
    formData.append("image", data.postImg[0]);
    createPost(formData)
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        data.postText = "";
        data.postImg = "";
        setWritePost("");
        setPostImg(null);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <div>
      <div>
        <Box
          display="flex"
          flexDirection="row"
          gap={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          mt={12}
        >
          {friendsList?.data.map((friend) => (
            <Card key={friend.username}>
              <CardMedia
                component="img"
                height="140"
                image={
                  friend.image
                    ? friend.image
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt={friend.name}
              />

              <CardContent>
                <Typography
                  variant="h5"
                  style={{ textOverflow: "ellipsis" }}
                  component="div"
                >
                  {friend.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  @{friend.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {friend.bio}
                </Typography>
                <Button
                  onClick={handleAddFriendClick(friend)}
                  variant="contained"
                  color="primary"
                >
                  Add Friend
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: "20px",
          }}
        >
          {/* <div style={{ width: "40px" }}>
            {postImg && <img src={url} alt="post Img" />}
          </div> */}
          <TextField
            label="Write your post"
            value={writePost}
            {...register("postText", { required: "Post is required" })}
            onChange={(e) => setWritePost(e.target.value)}
          />
          <Button
            component="label"
            role={undefined}
            startIcon={<CollectionsIcon />}
          >
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              {...register("postImg")}
              onChange={(e) => {
                setPostImg(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            />
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(handlePostUpload)}
          >
            Upload Post
          </Button>
        </div>

        {postLoading && <h1>Loading...</h1>}
        {posts?.data?.posts &&
          posts?.data.posts.map((post) => {
            return (
              <div key={post._id}>
                <h1>{post.description}</h1>
{post.image&&<img src={post.image} alt="" />}
              </div>
            );
          })}
      </div>
      {}
    </div>
  );
}
