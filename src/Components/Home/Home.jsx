import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  useAddFriendMutation,
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
import { useForm, SubmitHandler } from "react-hook-form";
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
          // width={"500px"}
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

        <div sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: "20px", 
          
        }}>
          <TextField
            label="Write your post"
            // multiline
            // rows={2}
            {...register("postText", { required: "Post is required" })}
          />
          <Button
            component="label"
            role={undefined}

            startIcon={<CollectionsIcon />}
          >
            <VisuallyHiddenInput type="file" accept="image/*" {...register("postImg")} />
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
